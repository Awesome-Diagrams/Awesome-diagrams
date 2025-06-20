import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Elem } from "~/model/elem/Elem";

const umlInterfaceSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  methods: z.string(),
});

export const InterfaceDiagramEditForm = ({ elem }: { elem: Elem }) => {
  const currentData = elem.getUMLInterfaceData?.() || {
    className: "",
    attributes: [],
    methods: [],
  };

  const form = useForm<z.infer<typeof umlInterfaceSchema>>({
    resolver: zodResolver(umlInterfaceSchema),
    defaultValues: {
      className: currentData.className,
      methods: currentData.methods.join("\n"),
    },
  });

  const onSubmit = useCallback(() => {
    const formData = form.getValues();
    
    elem.setUMLInterfaceData({
      className: formData.className,
      attributes: [],
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