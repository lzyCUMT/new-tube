import { Webhook } from "svix";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { users } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: Request) {
  // 1. 从环境变量获取 Secret
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // 2. 获取 Svix 校验需要的 Header
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // 如果缺少必要的 Header，直接返回错误
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // 3. 获取原始 Body (svix 校验必须使用原始字符串)
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 4. 初始化 Webhook 并校验签名
  const wh = new Webhook(SIGNING_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured during verification", {
      status: 400,
    });
  }

  // 5. 处理业务逻辑

  const eventType = evt.type;

  if (eventType === "user.created") {
    const data = evt.data;
    // 这里执行你的数据库写入操作，例如：
    // await db.user.create({ data: { clerkId: id, ... } })
    // console.log("新用户已创建:", evt.data);
    await db.insert(users).values({
      clerkId: data.id,
      name: `{data.firstName} {data.lastName}}`,
      imageUrl: data.image_url,
    });
  }

  if (eventType === "user.updated") {
    console.log("用户信息已更新:", evt.data);
  }

  return new Response("Success", { status: 200 });
}
