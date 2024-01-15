"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

const userSchema = z.object({
  username: z.string().min(3),
  address: z.string().min(6),
  phone: z.coerce
    .number({ invalid_type_error: "Should be a number" })
    .positive()
    .gte(1000000000, "Should be a 10 digit number")
    .lte(9999999999, "Should be a 10 digit number"),
  location: z.object({ lat: z.string(), long: z.string() }),
  quality: z.string(),
  model: z.string(),
  capacity: z.string(),
  fov: z.string(),
  url: z.string(),
});

export default function Register() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({resolver: zodResolver(userSchema)});

  const onSubmit = (data) => {
    console.log("submitted");
    axios
      .post("http://localhost:3000/api/register", data)
      .then((response) => console.log(response));
  };

  const setQuality = (data) => {
    console.log(data);
    setValue("quality", data);
  };

  const setOrientation = (value) => {
    setValue("orientation", value);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">User Details</TabsTrigger>
            <TabsTrigger value="password">Camera Specs</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Enter your personal details here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    {...register("username")}
                    id="name"
                    placeholder="name"
                  />
                  {errors.username && (
                    <Alert
                      variant="destructive"
                      className="w-[20vw] border-none"
                    >
                      <AlertDescription>
                        {errors.username.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone No</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="10 digit mobile number"
                    pattern="\d*"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <Alert
                      variant="destructive"
                      className="w-[20vw] border-none"
                    >
                      <AlertDescription>
                        {errors.phone.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    {...register("address")}
                    id="address"
                    type="text"
                    placeholder="Address"
                  />
                  {errors.address && (
                    <Alert
                      variant="destructive"
                      className="w-[20vw] border-none"
                    >
                      <AlertDescription>
                        {errors.address.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  Please go to next section to give the camera details
                </CardDescription>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Camera Specifications</CardTitle>
                <CardDescription>
                  Please give your camera specifications here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-5 text-center items-center">
                  <Label htmlFor="lat">Lattitude: </Label>
                  <Input id="lat" {...register("location.lat")} />
                  <Label htmlFor="long">Longitude: </Label>
                  <Input id="long" {...register("location.long")} />
                  {errors.location?.lat ||
                    (errors.location?.long && (
                      <Alert
                        variant="destructive"
                        className="w-[20vw] border-none"
                      >
                        <AlertDescription>
                          {errors.location?.lat?.message ||
                            errors.location?.long?.message}
                        </AlertDescription>
                      </Alert>
                    ))}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quality">Quality</Label>
                  <Select
                    onValueChange={setQuality}
                    {...register("quality", { value: "480p" })}
                    id="quality"
                    defaultValue="480p"
                  >
                    <SelectTrigger>
                      <SelectValue />
                      <SelectContent>
                        <SelectItem value="360p or below">
                          360p or below
                        </SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="1080p or more">
                          1080p or more
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    {...register("model")}
                    id="model"
                    type="text"
                    placeholder="Camera model"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="capacity">Recording Capacity</Label>
                  <Input
                    {...register("capacity")}
                    id="capacity"
                    type="text"
                    placeholder="no of days"
                  />
                  {errors.capacity && (
                    <Alert
                      variant="destructive"
                      className="w-[20vw] border-none"
                    >
                      <AlertDescription>
                        {errors.capacity.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="fov">Field of View</Label>
                  <Input
                    {...register("fov")}
                    id="fov"
                    type="text"
                    placeholder="Field of View"
                  />
                  {errors.fov && (
                    <Alert
                      variant="destructive"
                      className="w-[20vw] border-none"
                    >
                      <AlertDescription>{errors.fov.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-1">
                  <Label id="orientation">Camera Orientation</Label>
                  <Select
                    onValueChange={setOrientation}
                    {...register("orientation", { value: "north" })}
                    htmlFor="orientation"
                    defaultValue="north"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="orientation" />
                      <SelectContent>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="north-east">North-East</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="south-east">South-East</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="west-south">West-South</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="north-west">North-West</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="url">Url</Label>
                  <Input
                    {...register("url")}
                    type="text"
                    id="url"
                    placeholder="Url"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Register</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
