package com.example.prodBackend.Controller;


import com.example.prodBackend.DTO.StaffLoginRequest;
import com.example.prodBackend.DTO.StockUpdateRequest;
import com.example.prodBackend.DTO.TransactionRequest;
import com.example.prodBackend.Model.Product;
import com.example.prodBackend.Model.Staff;
import com.example.prodBackend.Model.Transaction;
import com.example.prodBackend.Service.GroqLanguageModelService;
import com.example.prodBackend.Service.StaffService;
import com.example.prodBackend.Service.serviceProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.CompletableFuture;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductContoller {
    @Autowired
    private serviceProduct service;

    @Autowired
    private StaffService staffService;

    @Autowired
    private GroqLanguageModelService groqService;
    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestBody Product products){
        service.addProduct(products);
        return new ResponseEntity<>(products, HttpStatus.CREATED);
    }
    @PostMapping("/staff/login")
    public ResponseEntity<?> staffLogin(@RequestBody StaffLoginRequest loginRequest) {
        boolean isAuthenticated = staffService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {
            // Assuming 'staffService.getStaffByEmail' returns the staff object based on email
            Staff staff = staffService.getStaffByEmail(loginRequest.getEmail());
            return ResponseEntity.ok(staff);  // Respond with the staff object
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid email or password\"}");
        }
    }


    @PostMapping("/scan")
    public CompletableFuture<ResponseEntity<Product>> scanProd(@RequestParam("file") MultipartFile file1) {
        try {
            // Create a temporary file to store the uploaded image
            Path tempFile1 = Files.createTempFile("image1", ".jpeg");

            // Transfer the uploaded file to the temporary file
            file1.transferTo(tempFile1.toFile());

            // Define the prompt for the vision model
            String prompt = "Extract both the product name and brand name from the provided image. The product name is typically found on the packaging or label of the product, and the brand name is usually displayed prominently on the packaging or logo. "
                    + "Return the result in the following JSON format, without any additional information or text:\n"
                    + "{\n"
                    + "  \"productName\": \"<extracted_product_name>\",\n"
                    + "  \"brandName\": \"<extracted_brand_name>\"\n"
                    + "}\n\n"
                    + "Make sure to output only the JSON object and nothing else.";

            // Call the service to analyze the image with the provided prompt
            CompletableFuture<String> result1 = service.analyzeImage(tempFile1, prompt);

            // Process the result and send back the product to the frontend
            return result1.thenApply(result -> {
                try {
                    // Call the service to parse the result and save the product
                    Product product = service.jsonProductNameAndSave(result);

                    // Return the product to the frontend
                    return ResponseEntity.ok(product);
                } catch (RuntimeException e) {
                    // Log the error
                    e.printStackTrace();
                    throw e; // Propagate the exception to be handled by the exceptionally block
                }
            }).exceptionally(throwable -> {
                // Handle any exceptions that occurred during the async processing
                throwable.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(null); // Return a 500 error with no product
            }).whenComplete((response, throwable) -> {
                // Clean up the temporary file
                try {
                    Files.deleteIfExists(tempFile1);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });

        } catch (Exception e) {
            // Handle synchronous exceptions (file creation/transfer errors)
            e.printStackTrace();
            return CompletableFuture.completedFuture(
                    ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(null)
            );
        }
    }

    @PostMapping("/upload")
    public CompletableFuture<ResponseEntity<String>> analyzeImage(
            @RequestParam("file1") MultipartFile file1,
            @RequestParam("file2") MultipartFile file2) {
        try {
            // Save the uploaded file1 and file2 temporarily
            Path tempFile1 = Files.createTempFile("image1", ".jpeg");
            Path tempFile2 = Files.createTempFile("image2", ".jpeg");

            file1.transferTo(tempFile1.toFile());
            file2.transferTo(tempFile2.toFile());

            String prompt1 = "Analyze the image and return your response in this exact JSON format:\n" +
                    "{\n" +
                    "    \"brand_info\": {\n" +
                    "        \"brand_name\": \"EXACT_BRAND_NAME_HERE\",\n" +
                    "        \"brand_description\": \"BRAND_DESCRIPTION_IF_AVAILABLE_OR_ASSUMED\",\n" +
                    "        \"brand_foundation_year\": \"FOUNDATION_YEAR_IF_AVAILABLE_OR_ASSUMED\",\n" +
                    "        \"brand_country\": \"BRAND_COUNTRY_IF_AVAILABLE_OR_ASSUMED\"\n" +
                    "    },\n" +
                    "    \"product_info\": {\n" +
                    "        \"productName\": \"SPECIFIC_PRODUCT_NAME\",\n" +
                    "        \"description\": \"COMPELLING_MARKETING_DESCRIPTION_HERE\"\n" +
                    "    }\n" +
                    "}\n\n" +
                    "Specific Guidelines:\n" +
                    "- Brand information must include:\n" +
                    "  * Brand name (exactly as seen in the image)\n" +
                    "  * Brand description (provide a description if visible, otherwise assume based on brand identity)\n" +
                    "  * Brand foundation year (assume a plausible year if not visible)\n" +
                    "  * Brand country (assume the country if not visible)\n" +
                    "- Product name should be precise and descriptive, exactly as seen in the image\n" +
                    "- Marketing description must be:\n" +
                    "  * 3-4 sentences long\n" +
                    "  * Highlight key visual features\n" +
                    "  * Create emotional appeal\n" +
                    "  * Sound professional and enticing\n" +
                    "  * Focus on benefits to the potential customer\n" +
                    "- If any value is not visible or extractable, assume plausible values based on context.";


            String prompt2 = "Analyze the image and return your response in this exact JSON format:\n" +
                    "{\n" +
                    "    \"nutritional_information\": {\n" +
                    "        \"calories\": \"CALORIES_IN_PRODUCT (if not extractable, assign a value you think is appropriate)\",\n" +
                    "        \"fat\": \"FAT_CONTENT_IN_GRAMS (if not extractable, assign a value you think is appropriate)\",\n" +
                    "        \"protein\": \"PROTEIN_CONTENT_IN_GRAMS (if not extractable, assign a value you think is appropriate)\",\n" +
                    "        \"carbohydrates\": \"CARBOHYDRATES_CONTENT_IN_GRAMS (if not extractable, assign a value you think is appropriate)\"\n" +
                    "    },\n" +
                    "    \"category\": \"CATEGORY_OF_PRODUCT (if not extractable, assign a category you think is appropriate)\",\n" +
                    "    \"price\": \"PRICE_OF_PRODUCT (if not extractable, assign a value you think is appropriate)\"\n" +
                    "}\n\n" +
                    "Specific Guidelines:\n" +
                    "- Nutritional information should provide precise values for calories, fat, protein, and carbohydrates. If not extractable, assign a value that is most appropriate based on the image context.\n" +
                    "- Category should specify the product category (e.g., snack, beverage, etc.). If not extractable, assign the most suitable category.\n" +
                    "- Price should be extracted exactly from the image. If not available, assign the most appropriate value based on the product and context.";

            // First call for prompt1 using file1
            CompletableFuture<String> result1 = service.analyzeImage(tempFile1, prompt1);

            // Second call for prompt2 using file2
            CompletableFuture<String> result2 = service.analyzeImage(tempFile2, prompt2);

            // Combine both results and return as a single response
            return result1.thenCombine(result2, (response1, response2) -> {
                // Concatenate the results into one JSON response
                String combinedResult = "{\n" +
                        "\"prompt1_result\": " + response1 + ",\n" +
                        "\"prompt2_result\": " + response2 + "\n" +
                        "}";
                String consolidatedResponse = service.consolidateWithGroqModel(combinedResult);
                System.out.println(service.jsonExtractAndSaveBrand(consolidatedResponse));
                System.out.println(service.jsonExtractAndSaveProduct(consolidatedResponse));
                return ResponseEntity.ok(consolidatedResponse);
            });

        } catch (Exception e) {
            return CompletableFuture.completedFuture(
                    ResponseEntity.status(500).body("Failed to process the image: " + e.getMessage()));
        }
    }

    @PostMapping("/update-stock")
    public ResponseEntity<Product> updateStock(@RequestBody StockUpdateRequest request) {
        System.out.println(request.getProductName());
        Product updatedProduct = service.updateStock(
                request.getProductName(),
                request.getStock()
        );
        return ResponseEntity.ok(updatedProduct);
    }

        @PostMapping("/billing")
        public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequest request) {
            try {
                Transaction transaction = service.processTransaction(request);
                return ResponseEntity.ok(transaction);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

//    @PostMapping("/reduce-stock")
//    public ResponseEntity<Product> reduceStock(@RequestBody StockUpdateRequest request) {
//        System.out.println(request.getProductName());
//        Product updatedProduct = service.reduceStock(
//                request.getProductName(),
//                request.getStock()
//        );
//        return ResponseEntity.ok(updatedProduct);
//    }
}