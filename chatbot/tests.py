from django.test import TestCase

# Create your tests here.

from google import genai

client = genai.Client(api_key="entr yor api key")

response = client.models.generate_content(
    model="gemini-1.5-flash",
    contents="Hello"
)

print(response.text)
