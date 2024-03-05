import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SingInUpCard() {
  return (
    <Card className="md:max-w-sm min-w-80 w-full">
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2 pt-16">
          <span className="text-lg font-semibold">New to [NAME]?</span>
          <span>Sign up for the best experience</span>
          <Button>Sign up</Button>
          <Button variant="ghost">Log in</Button>
        </div>
      </CardContent>
    </Card>
  );
}
