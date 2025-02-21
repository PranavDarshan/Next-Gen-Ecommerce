package com.example.prodBackend.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class GroqLanguageModelService {

    private static final String API_KEY = "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";
    private static final String API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

    public String callModel(String prompt, String combinedJson) {
        try {
            // Construct the JSON payload for the model using Gson
            JsonObject requestBody = new JsonObject();
            requestBody.addProperty("model", "llama-3.2-90b-vision-preview");

            JsonArray messages = new JsonArray();
            JsonObject userMessage = new JsonObject();
            userMessage.addProperty("role", "user");

            // Combine prompt and JSON into a single string content
            String combinedContent = prompt + "\n\nContext JSON:\n" + combinedJson;
            userMessage.addProperty("content", combinedContent);

            messages.add(userMessage);
            requestBody.add("messages", messages);
            requestBody.addProperty("max_tokens", 1024);

            // Create HTTP client and request
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(API_ENDPOINT))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + API_KEY)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                    .build();

            // Send request and process response synchronously
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Check if the request was successful
            if (response.statusCode() == 200) {
                return extractResponseFromJson(response.body());
            } else {
                throw new RuntimeException("Groq API Error: " + response.body());
            }

        } catch (Exception e) {
            throw new RuntimeException("Error calling Groq model: " + e.getMessage(), e);
        }
    }

    private String extractResponseFromJson(String responseBody) {
        JsonObject responseJson = new com.google.gson.JsonParser().parse(responseBody).getAsJsonObject();
        return responseJson.get("choices")
                .getAsJsonArray()
                .get(0)
                .getAsJsonObject()
                .get("message")
                .getAsJsonObject()
                .get("content")
                .getAsString();
    }


}