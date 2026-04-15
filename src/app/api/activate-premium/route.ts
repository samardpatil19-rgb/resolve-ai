import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Set premium for 30 days (demo)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        // Upsert profile with premium status
        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: user.id,
                is_premium: true,
                premium_expires_at: expiresAt.toISOString(),
                updated_at: new Date().toISOString(),
            }, { onConflict: "id" });

        if (error) {
            console.error("Premium activation error:", error);
            return NextResponse.json(
                { error: "Failed to activate premium" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            premium_expires_at: expiresAt.toISOString(),
        });
    } catch (error) {
        console.error("Payment error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
