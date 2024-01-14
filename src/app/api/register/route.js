import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/utils/db"
import User from "../../../models/userSchema.js"
export async function GET(request,response){

    return NextResponse.json({msg: "Hello there"})
}


export async function POST(request,response){
    const data= await request.json()
    await connectDB();
    console.log(data)
    await User.create(data)
    return Response.json(data)
}