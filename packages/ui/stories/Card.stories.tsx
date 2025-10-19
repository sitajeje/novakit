import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../src/components/card/Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Modern Card</CardTitle>
        <CardDescription>A minimalist, modern styled card component.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This Card uses gradients, blur, and subtle hover animations to achieve a modern look.
        </p>
      </CardContent>
      <CardFooter>
        <button className="rounded-xl bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};
