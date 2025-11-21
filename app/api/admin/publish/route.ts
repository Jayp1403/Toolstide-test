import { NextResponse } from "next/server";
import { ddb, POSTS_TABLE_NAME } from "@lib/dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { Post } from "@lib/types";

export async function POST(req: Request) {
  try {
    const { title, category, content } = await req.json();

    if (!title || !category || !content) {
      return NextResponse.json(
        { error: "Missing title, category, or content." },
        { status: 400 }
      );
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `untitled-${Date.now()}`;

    const date = new Date().toISOString().slice(0, 10);
    const excerpt =
      content.replace(/<[^>]+>/g, "").slice(0, 180) + "...";

    const newPost: Post = {
      slug,
      title,
      category,
      content,
      date,
      excerpt,
    };

    console.log("Writing post to Dynamo:", newPost);

    await ddb.send(
      new PutCommand({
        TableName: POSTS_TABLE_NAME,
        Item: newPost,
      })
    );

    console.log("Write complete");

    return NextResponse.json({ ok: true, slug });
  } catch (err: any) {
    console.error("Publish failed:", err);
    return NextResponse.json(
      {
        error:
          err?.message ||
          "Failed to publish post (unknown server error).",
      },
      { status: 500 }
    );
  }
}
