from flask import Flask, request, Response
from google import genai
from google.genai import types

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        user_query = data.get("query", "").strip()
        if not user_query:
            return Response("Missing 'query' in request body", status=400)

        client = genai.Client(
            vertexai=True,
            project="matrix-development-463111",
            location="global",
        )

        # Static memory parts
        msg2_text1 = types.Part.from_text(text="Analyzing Card Categories ...")
        msg2_text2 = types.Part.from_text(text="Hello! American Express offers a wonderful selection ...")
        msg4_text1 = types.Part.from_text(text="Reviewing Card Options ...")
        msg4_text2 = types.Part.from_text(text="American Express offers a variety of credit cards ...")
        msg6_text1 = types.Part.from_text(text="Analyzing Eligibility Requirements ...")
        msg6_text2 = types.Part.from_text(text="To be eligible for an American Express credit card ...")
        msg8_text1 = types.Part.from_text(text="Clarifying User Queries ...")
        msg8_text2 = types.Part.from_text(text="The minimum annual income required for an Amex travel card ...")
        msg10_text1 = types.Part.from_text(text="Enumerating Card Advantages ...")
        msg10_text2 = types.Part.from_text(text="Amex travel cards offer fantastic benefits ...")
        msg12_text1 = types.Part.from_text(text="Acknowledging and Offering Help ...")

        si_text1 = "I'm here to help with American Express India credit card information, including benefits, eligibility, application guidance, and current offers. Try to reply within 30 words."

        model = "gemini-2.5-flash"
        contents = [
            types.Content(role="user", parts=[types.Part.from_text(text=": What types of cards")]),
            types.Content(role="model", parts=[msg2_text1, msg2_text2]),
            types.Content(role="user", parts=[types.Part.from_text(text=": What types of cards")]),
            types.Content(role="model", parts=[msg4_text1, msg4_text2]),
            types.Content(role="user", parts=[types.Part.from_text(text="what is eligibility criteria")]),
            types.Content(role="model", parts=[msg6_text1, msg6_text2]),
            types.Content(role="user", parts=[types.Part.from_text(text="minimum annual income for travel card")]),
            types.Content(role="model", parts=[msg8_text1, msg8_text2]),
            types.Content(role="user", parts=[types.Part.from_text(text="suggest me benefits of travel card")]),
            types.Content(role="model", parts=[msg10_text1, msg10_text2]),
            types.Content(role="user", parts=[types.Part.from_text(text="hi")]),
            types.Content(role="model", parts=[msg12_text1, types.Part.from_text(text="Hello! How can I assist you with Amex India credit card information today?")]),
            types.Content(role="user", parts=[types.Part.from_text(text=user_query)]),
        ]

        generate_content_config = types.GenerateContentConfig(
            temperature=1,
            top_p=1,
            seed=0,
            max_output_tokens=1024,
            safety_settings=[
                types.SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF"),
                types.SafetySetting(category="HARM_CATEGORY_DANGEROUS_CONTENT", threshold="OFF"),
                types.SafetySetting(category="HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold="OFF"),
                types.SafetySetting(category="HARM_CATEGORY_HARASSMENT", threshold="OFF"),
            ],
            system_instruction=[types.Part.from_text(text=si_text1)],
            thinking_config=types.ThinkingConfig(thinking_budget=-1),
        )

        # ✅ Stream Gemini response as plain text (not JSON)
        def stream_response():
            for chunk in client.models.generate_content_stream(
                model=model,
                contents=contents,
                config=generate_content_config,
            ):
                if chunk.text:
                    yield chunk.text + " "  # Add space to simulate token flow

        return Response(stream_response(), mimetype='text/plain')

    except Exception as e:
        return Response(f"❗ Server error: {str(e)}", status=500)

if __name__ == '__main__':
    print("✅ Flask Gemini backend running on http://127.0.0.1:5000/generate")
    app.run(debug=True, port=5000)
