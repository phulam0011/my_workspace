# from flask import Flask, render_template, request
# import openai


# app = Flask(__name__)

# # Set up OpenAI API credentials
# openai.api_key = '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'


# # Define the default route to return the index.html file
# @app.route("/")
# def index():
#     return render_template("index.html")

# # Define the /api route to handle POST requests
# @app.route("/api", methods=["POST"])
# def api():
#     # Get the message from the POST request
#     message = request.json.get("message")
#     # Send the message to OpenAI's API and receive the response
    
    
#     completion = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "user", "content": message}
#     ]
#     )
#     if completion.choices[0].message!=None:
#         return completion.choices[0].message

#     else :
#         return 'Failed to Generate response!'
# if __name__ == '__main__':
#     # run app in debug mode on port 5000
#     app.run(debug=True, port=5000, host='0.0.0.0')
   

# # if __name__=='__main__':
# #     app.run()

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='103.200.23.188', port=5000)
