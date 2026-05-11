from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google import genai


client = genai.Client(api_key="YOUR-API-KEY")


@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        user_input = request.POST.get("message")

        if not user_input:
            return JsonResponse({"error": "No message provided"})

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=user_input
            )

            reply = response.text if hasattr(response, "text") else str(response)

        except Exception as e:
            reply = str(e)

        return JsonResponse({"response": reply})

    return render(request, "chat.html")