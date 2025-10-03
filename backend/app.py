                                                                                        
from flask import Flask, request, Response
from google import genai
from google.genai import types
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# ✅ Initialize Google GenAI Client (Vertex AI)
client = genai.Client(
    vertexai=True,
    project="matrix-development-463111",
    location="global",
)

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        user_query = data.get("query", "").strip()
        if not user_query:
            return Response("Missing 'query' in request body", status=400)

        # ✅ Direct content (No memory)
        contents = [
            types.Content(role="user", parts=[types.Part(text=user_query)])
        ]

        # ✅ Minimal generation config
        generate_config = types.GenerateContentConfig(
            temperature=0.7,
            max_output_tokens=256,
            system_instruction=[types.Part(text="You are an Amex India credit card assistant. Reply concisely.")],
            safety_settings=[
                types.SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF"),
                types.SafetySetting(category="HARM_CATEGORY_DANGEROUS_CONTENT", threshold="OFF"),
                types.SafetySetting(category="HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold="OFF"),
                types.SafetySetting(category="HARM_CATEGORY_HARASSMENT", threshold="OFF"),
            ],
        )

        # ✅ Stream Gemini response
        def stream_response():
            for chunk in client.models.generate_content_stream(
                model="gemini-2.5-flash",
                contents=contents,
                config=generate_config,
            ):
                if chunk.text:
                    yield chunk.text + " "

        return Response(stream_response(), mimetype="text/plain")

    except Exception as e:
        return Response(f"❗ Server error: {str(e)}", status=500)


if __name__ == '__main__':
    print("✅ Flask Gemini backend running on http://0.0.0.0:5000/generate")
    app.run(host='0.0.0.0', port=5000, debug=True)

