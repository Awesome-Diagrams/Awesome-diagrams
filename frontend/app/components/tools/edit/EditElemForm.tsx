import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Elem } from "~/model/elem/Elem";
import { Palette } from "lucide-react";


const formSchema = z.object({
  text: z.string().min(0).max(10),
	fontSize: z.number().min(0),
	textColor: z.string().min(7).max(7),
	opacity: z.number().optional(),
	strokeColor: z.string().optional(),
	strokeWidth: z.number().optional(),
	width: z.number().min(0),
	height: z.number().min(0),
	color: z.string().min(7).max(7)
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
			elem.setWidth(formVal.width);
			elem.setHeigth(formVal.height);

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

        <Button form="uniqueFormId" type="submit" onClick={onSubmit}>Submit</Button>
      </form>
    </Form>
  )
}