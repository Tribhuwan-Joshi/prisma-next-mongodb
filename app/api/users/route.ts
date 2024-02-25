import prisma from "@/prisma";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    await prisma?.$connect();
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
