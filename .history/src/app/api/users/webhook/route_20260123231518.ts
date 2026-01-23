import { Webhook } from "svix";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { users } from "@/db/schema";
import { db } from "@/db";
8;

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
    const { id, first_name, last_name, image_url } = evt.data;
    // 这里执行你的数据库写入操作，例如：
    // await db.user.create({ data: { clerkId: id, ... } })
    await db.insert(users).values({
      // 必须使用 schema.ts 第 12 行定义的变量名 clerkId
      clerkId: id,
      // 必须使用 schema.ts 第 13 行定义的变量名 name
      name: `${first_name || ""} ${last_name || ""}`.trim() || "新用户",
      // 必须使用 schema.ts 第 14 行定义的变量名 imageUrl
      imageUrl: image_url || "",
    });
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data; // deleted 事件中 id 可能在根部

    if (!id) {
      return new Response("Missing user id", { status: 400 });
    }

    // 修复：使用 users.clerkId 且 data 来源正确
    await db.delete(users).where(eq(users.clerkId, id));
  }

  if (eventType === "user.updated") {
    const { id, first_name, last_name, image_url } = evt.data;
    if (!id) {
      return new Response("Missing user id", { status: 400 });
    }
    await db.insert(users).values({
      // 2. 必须使用 schema.ts 中定义的变量名 clerkId
      clerkId: id,
      // 3. 正确使用反引号 ` 和 ${} 进行字符串拼接，处理空名
      name: `${first_name || ""} ${last_name || ""}`.trim() || "新用户",
      // 4. 必须使用 schema.ts 中定义的变量名 imageUrl
      imageUrl: image_url || "",
    });
  }

  return new Response("Success", { status: 200 });
}
