// import data from "../data.json" with { type: "json" };

export function GET() {
    return Response.json([
        {
            "name": "Aardonyx",
            "description": "An early stage in the evolution of sauropods."
        }
    ]);
}
