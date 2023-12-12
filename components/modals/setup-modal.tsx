"use client";
import { useState, useEffect } from "react";
import {
  BookOpenText,
  Camera,
  Dumbbell,
  GlassWater,
  Salad,
  WineOff,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Hooks
import { useForm } from "react-hook-form";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

enum FormSteps {
  Rules = 0,
  Motivation = 1,
  Physical = 2,
  FrontProgressPhoto = 3,
  SideProgressPhoto = 4,
}

const formSchema = z.object({
  motivation: z.string().min(1, {
    message:
      "Please add your motivation. It is important to know why you have started the challenge when times get hard.",
  }),
  height: z.number().min(1, {
    message: "Please add your height in cm.",
  }),
  weight: z.number().min(1, {
    message: "Please add your height in kg.",
  }),
});

export const SetupModal = () => {
  const [setupModalIsMounted, setSetupModalIsMounted] =
    useState<boolean>(false);
  const [currentFormStep, setCurrentFormStep] = useState<FormSteps>(
    FormSteps.Rules,
  );

  useEffect(() => {
    setSetupModalIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motivation: "",
      height: 0,
      weight: 0,
    },
  });

  if (!setupModalIsMounted) {
    return null;
  }

  const handleOnPreviousFormStep = () => {
    if (currentFormStep === 0) {
      return undefined;
    }
    setCurrentFormStep((currentFormStep) => currentFormStep - 1);
  };

  const handleOnNextFormStep = () => {
    if (currentFormStep === 4) {
      return undefined;
    }
    setCurrentFormStep((currentFormStep) => currentFormStep + 1);
  };

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Could not set up your account.");
      }
    }
  };

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Set up your account
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Welcome to the challenge! Over the next 75 days, embark on a
            transformative journey. Let's kickstart your progress by setting up
            your account.
          </DialogDescription>
        </DialogHeader>
        {currentFormStep === FormSteps.Rules && (
          <section className="px-8 py-4">
            <div className="flex flex-col gap-4">
              {/* Diet */}
              <div className="flex flex-row items-center gap-3">
                <Salad className="w-10 text-2xl text-zinc-500" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-black">
                    1. Follow a diet
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Maintain a disciplined and balanced diet without any cheat
                    meals to fuel your body effectively.
                  </p>
                </div>
              </div>
              {/* Alcohol */}
              <div className="flex flex-row items-center gap-3">
                <WineOff className="w-10 text-2xl text-zinc-500" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-black">
                    2. No alcohol
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Abstain from alcohol throughout the challenge to maximize
                    mental clarity and physical performance.
                  </p>
                </div>
              </div>
              {/* Workouts */}
              <div className="flex flex-row items-center gap-3">
                <Dumbbell className="w-10 text-2xl text-zinc-500" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-black">
                    3. Two workouts
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Engage in two daily 45-minute workouts, one outdoors, to
                    boost physical resilience and mental endurance.
                  </p>
                </div>
              </div>
              {/* Water */}
              <div className="flex flex-row items-center gap-3">
                <GlassWater className="w-10 text-2xl text-zinc-500" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-black">
                    4. Drink four litres of water
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Hydrate consistently by consuming four litres of water
                    daily, aiding recovery and overall well-being.
                  </p>
                </div>
              </div>
              {/* Read */}
              <div className="flex flex-row items-center gap-3">
                <BookOpenText className="w-10 text-2xl text-zinc-500" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-black">
                    5. Read ten pages of a non&#8209;fiction book
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Foster mental growth and learning by dedicating time to read
                    10 pages of a non-fiction book daily.
                  </p>
                </div>
              </div>
              {/* Progress photos */}
              <div className="flex flex-row items-center gap-3">
                <Camera className="w-10 text-5xl text-zinc-500" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-black">
                    6. Take progress photos
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Track your physical transformation by taking daily progress
                    photos, marking your journey's evolution.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-8"
          >
            {currentFormStep === FormSteps.Motivation && (
              <div className="px-6">
                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your motivation and intentions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I am doing the challenge to..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use this space to fuel your determination and stay
                        focused on your journey's purpose.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {currentFormStep === FormSteps.Physical && (
              <div className="space-y-6 px-6">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your height (cm)</FormLabel>
                      <FormControl>
                        <Input placeholder="180cm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your weight (kg)</FormLabel>
                      <FormControl>
                        <Input placeholder="86kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <DialogFooter className="px-6 py-4">
              {currentFormStep !== FormSteps.Rules && (
                <Button
                  type="button"
                  aria-label="See previous form step"
                  onClick={handleOnPreviousFormStep}
                  variant="ghost"
                >
                  Previous
                </Button>
              )}
              <Button
                type="button"
                aria-label="See next form step"
                onClick={handleOnNextFormStep}
                variant="default"
              >
                Next
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
