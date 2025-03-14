
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFamily } from "@/contexts/FamilyContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

const HandwrittenNoteForm: React.FC = () => {
  const { activeProfile, addMessage } = useFamily();
  const [activeTab, setActiveTab] = useState<string>("text");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!activeProfile) return;
    
    if (activeTab === "handwritten" && canvasRef.current) {
      const imageData = canvasRef.current.toDataURL();
      
      addMessage({
        content: imageData,
        senderId: activeProfile.id,
        isAnnouncement: false,
        isHandwritten: true,
      });
      
      clearCanvas();
    } else {
      addMessage({
        content: data.content,
        senderId: activeProfile.id,
        isAnnouncement: false,
      });
      
      form.reset();
    }
  };

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.lineJoin = "round";
        context.lineCap = "round";
        context.lineWidth = 3;
        setCtx(context);
      }
    }
  }, []);

  const startPaint = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsPainting(true);
    paint(e);
  };

  const stopPaint = () => {
    setIsPainting(false);
    if (ctx) {
      ctx.beginPath();
    }
  };

  const paint = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPainting || !ctx || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    
    if ("touches" in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="handwritten" className="flex items-center gap-1">
              <Pencil className="h-3 w-3" /> Handwritten
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Type your message here..." 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="handwritten" className="mt-4">
            <div className="space-y-4">
              <div 
                className="border rounded-md bg-yellow-50 relative h-[160px] overflow-hidden"
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full touch-none cursor-crosshair"
                  onMouseDown={startPaint}
                  onMouseMove={paint}
                  onMouseUp={stopPaint}
                  onMouseLeave={stopPaint}
                  onTouchStart={startPaint}
                  onTouchMove={paint}
                  onTouchEnd={stopPaint}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearCanvas}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" /> Clear
                </Button>
                <Button 
                  size="sm" 
                  onClick={form.handleSubmit(onSubmit)}
                  className="flex-1"
                >
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HandwrittenNoteForm;
