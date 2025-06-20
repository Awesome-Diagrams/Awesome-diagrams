import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Elem } from "~/model/elem/Elem";

const umlClassSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  attributes: z.string(),
  methods: z.string(),
});

export const ClassDiagramEditForm = ({ elem }: { elem: Elem }) => {
  const currentData = elem.getUMLClassData?.() || {
    className: "",
    attributes: [],
    methods: [],
  };

  const form = useForm<z.infer<typeof umlClassSchema>>({
    resolver: zodResolver(umlClassSchema),
    defaultValues: {
      className: currentData.className,
      attributes: currentData.attributes.join("\n"),
      methods: currentData.methods.join("\n"),
    },
  });

  const onSubmit = useCallback(() => {
    const formData = form.getValues();
    
    elem.setUMLClassData({
      className: formData.className,
      attributes: formData.attributes.split("\n").filter(line => line.trim()),
      methods: formData.methods.split("\n").filter(line => line.trim()),
    });
  }, [form, elem]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="MyClass" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attributes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attributes (one per line)</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder={`name: string\nage: number`}
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="methods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Methods (one per line)</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder={`getName(): string\nsetName(name: string): void`}
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Class</Button>
      </form>
    </Form>
  );
};