Bs"d

README for the medical data management project
Project description
This project includes a web system built using React, Python and SQL technologies. The system allows users to enter medical information regarding their injuries, save data on the server, and send it to AI for processing and extracting and investigating important details. Using advanced technologies in general and AI in particular, such as - RAG (Retrieval-Augmented Generation), Language Models (LLM), and Flask for server development.
Site structure
The site is built from five main pages, each of which serves a specific purpose in the data entry and verification process:
1. First page: "Tell me briefly what happened"
o The user is asked to fill out a text form with the option to attach additional documents. The information is sent to the server in Python where the text processing process takes place, with the aim of extracting the following details:
 Date of injury
 The victim's name
 Identity card
 Age
 Father's name
 The date of the injury
 The name of the hospital or medical institution
 Medical form
 Treating doctors (orthopedist, family doctor, emergency room doctor, etc.)
2. Second page: "Awaiting system check"
o An intermediate page waiting for the system to be checked.
3. Third page: Verification of details
o The user is required to check the entered details and verify them using the "OK" or "Change" button.
4. Fourth page: editing details
o If the user has chosen to change the details, the full fields are displayed with the existing values ​​that can be edited. The user can save the changes using the "Save" button.
5. Fifth page: completion of missing details
o After confirming the details, if there are any missing details, the user is asked to fill in the missing details to complete the process.
6. Page six: "The details have been saved successfully"
o A final page notifying that the details have been saved successfully.
technologies and uses
• React: used for client side development. React allows building a dynamic and interactive user interface.
• Python: used to develop the server side, where the information is processed and communicated with the AI.
• SQL: used to save and manage the medical data.
Why were these technologies chosen?
• React - chosen because of its advanced capabilities in managing dynamic user interfaces, high performance and active community support. and navigation between the different pages by useNavigate
• -Python was chosen for its flexibility, advanced data processing capability, and support for many text processing and AI libraries.
• -SQL was chosen to maintain data in an orderly and accessible manner, while maintaining high performance and performing advanced queries.
In this project, I built a system that collects information about injured people from texts, processes the information, and returns ordered details such as name, age, ID card, hospital, and date of injury. I used several tools and technologies to create the system, including RAG (Retrieval-Augmented Generation), language modeling (LLM), and Flask for server development.
Why did I choose RAG?
RAG is an approach that combines searching a database with generating answers based on the information found. For example, when a person asks a question about a certain document, instead of trying to create an answer directly from the model, RAG searches for the most relevant documents in the database, and then the model creates an answer based on those documents.
In my project, I want to ensure that the answers are based on real and accurate texts - for example, when a question is asked about a certain wounded person, the system will first search for relevant texts, find the sections closest to the question, and then create an answer based on the information found.
Why did I use LLM and the HEBERT model?
The LLM (Large Language Models), like BERT and HebERT, are language models that understand text and are able to analyze it with a high level of accuracy. HeBERT is a model based on the Hebrew language, so it is particularly suitable for processing texts in this language. The choice of HebERT was natural in a project based on the processing of Hebrew texts.
For example, when asking the system "What is the name of the injured?", the model can recognize the question, find the relevant part of the text (for example, "The name of the injured is Joseph"), and return an accurate answer.
What I did in the code:
1. Splitting texts: the code has a function that splits the text into parts, to facilitate its processing. The texts are divided into small pieces, so that each piece is sent to the system to find the appropriate answer.
2. Creation of embeddings vectors: after splitting the text, the system converts these parts into "vectors" - that is, numerical representations that allow the system to understand the meaning of each part of the text. For this purpose I used the HebERT model, which knows how to convert Hebrew texts into numbers that the computer understands.
3. Search and return an answer: when a question is asked (for example, "What is the name of the injured?"), the system compares the question with the vectors and finds the most relevant sections of the text. She then uses another model to generate an answer based on these passages.
Why did I use Flask?
Flask is a simple and easy-to-use tool for server-side development. His choice was due to several reasons:
• Ease of development: Flask allows you to develop a server quickly and without unnecessary complications.
• API support: through Flask you can build an interface that allows you to send texts to the server and receive answers from them. For example, when the client sends new text, the server processes the text and returns the requested information.
• CORS support: Flask supports CORS, which allows the server to communicate with different browsers, and thus the system can be developed in a way that will also work in a web environment.
Summary of the process:
1. The customer sends a text through a web interface (for example, a text about an injured person).
2. Flask receives the text and passes it on for processing.
3. HebERT processes the text and produces vectors that describe it.
4. RAG looks for the relevant information in the text and returns an answer to the question.
This system allows users to ask questions in a natural way, and receive accurate answers based on existing texts, in an easy and efficient way.
