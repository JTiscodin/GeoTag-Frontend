import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/utils/db"
import User from "../../../models/userSchema.js"
export async function GET(request,response){
    const users = await User.find({})
    return NextResponse.json(users)
}


export async function POST(request,response){
    const data= await request.json()
    await connectDB();
    console.log(data)
    await User.create(data)
    return Response.json(data)
}