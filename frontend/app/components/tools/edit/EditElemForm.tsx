import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Elem } from "~/model/elem/Elem";
import { Palette, Underline } from "lucide-react";
import { ShapeType } from "~/model/DiagramSerialized";


const formSchema = z.object({
  text: z.string().min(0).max(10),
	fontSize: z.number().min(0),
	textColor: z.string().min(7).max(7),
	opacity: z.number().optional(),
	strokeColor: z.string().optional(),
	strokeWidth: z.number().optional(),
	width: z.number().min(0),
	height: z.number().min(0),
	color: z.string().min(7).max(7),
  x1: z.number().min(0).optional(),
  x2: z.number().min(0).optional(),
  y1: z.number().min(0).optional(),
  y2: z.number().min(0).optional(),
})

export interface EditElemProps {
	elem: Elem;
}

export const EditElemForm = ({ elem }: EditElemProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
			color: elem.getColor(),

      text: elem.getText().text,
			fontSize: elem.getText().fontSize,
			textColor: elem.getText().color,

			width: elem.getWidthShape(),
			height: elem.getHeigthShape(),

			strokeWidth: elem.getCustomConfig().stroke?.width,
			strokeColor: elem.getCustomConfig().stroke?.color,
			opacity: elem.getCustomConfig().opacity,

      x1: elem.getType() === ShapeType.Line ? elem.getX1() : undefined,
      y1: elem.getType() === ShapeType.Line ? elem.getY1() : undefined,
      x2: elem.getType() === ShapeType.Line ? elem.getX2() : undefined,
      y2: elem.getType() === ShapeType.Line ? elem.getY2() : undefined,
    },
  })

	const onSubmit = useCallback(() => {
		form.clearErrors();
		const formVal = form.getValues();

		const conf = elem.getCustomConfig(); 
		elem.setCustomConfig({
				...conf,
				opacity: formVal.opacity,
				stroke: formVal.strokeColor && formVal.strokeWidth 
					? { color: formVal.strokeColor, width: formVal.strokeWidth } 
					: conf.stroke
			});

			elem.setText({
				text: formVal.text,
				color: formVal.textColor,
				fontSize: formVal.fontSize,
			});

			elem.setColor(formVal.color)
      if (elem.getType() === ShapeType.Line) {
        elem.setPoints(formVal.x1!, formVal.y1!, formVal.x2!, formVal.y2!);
      } else {
        elem.setWidth(formVal.width);
        elem.setHeigth(formVal.height);
      }
  }, [form, elem]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="uniqueFormId">

			<FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color</FormLabel>
            <FormControl>
              {/* Используем input с type="color" */}
              <input
                type="color"
                {...field}
                value={field.value || "#000000"} // Устанавливаем начальный цвет
                onChange={(e) => field.onChange(e.target.value)} // Обновляем значение
                className="w-16 h-10 border rounded" // Стили для элемента
              />
            </FormControl>
            <FormDescription>
              Select a color for the figure.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="text" {...field} />
              </FormControl>
              <FormDescription>
                Write text on figure.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
				<FormField
          control={form.control}
          name="textColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Color</FormLabel>
              <FormControl>
                {/* Используем input с type="color" */}
                <input
                  type="color"
                  {...field}
                  value={field.value || "#000000"} // Устанавливаем начальный цвет
                  onChange={(e) => field.onChange(e.target.value)} // Обновляем значение
                  className="w-16 h-10 border rounded" // Стили для элемента
                />
              </FormControl>
              <FormDescription>
                Select a color for the text.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
				<FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font size</FormLabel>
              <FormControl>
                <Input placeholder="18" {...field} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}/>
              </FormControl>
              <FormDescription>
                Write font size here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {elem.getType() !== ShapeType.Line && (
          <>
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="50" {...field} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}/>
                  </FormControl>
                  <FormDescription>
                    Write width size here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="50" { ...field } onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}/>
                  </FormControl>
                  <FormDescription>
                    Write height size here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {elem.getType() === ShapeType.Line && (
          <>
            <FormField
              control={form.control}
              name="x1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X1</FormLabel>
                  <FormControl>
                    <Input placeholder="50" { ...field } onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="y1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Y1</FormLabel>
                  <FormControl>
                    <Input placeholder="50" { ...field } onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="x2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X2</FormLabel>
                  <FormControl>
                    <Input placeholder="50" { ...field } onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="y2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Y2</FormLabel>
                  <FormControl>
                    <Input placeholder="50" { ...field } onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button form="uniqueFormId" type="submit" onClick={onSubmit}>Submit</Button>
      </form>
    </Form>
  )
}