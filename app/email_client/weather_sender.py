# from .weather_getter import write_memo
# import time
# import json
# import schedule
# import os
# import ezgmail

# ezgmail.init(tokenFile="/app/email_client/token.json",
#              credentialsFile="/app/email_client/token.json")


# print("Logged into email: ", ezgmail.LOGGED_IN)
# location = "Granite Falls, WA 98252"
# API_KEY = os.environ.get("OPEN_WEATHER_API_KEY")


# def send_email():
#     # write_memo(location)

#     daily_memo = open("./memos/daily.txt", "r").read()
#     print(daily_memo)
#     # print(daily_memo)
#     ezgmail.send('adotterer@gmail.com', "Forecast for " + location,
#                  daily_memo, mimeSubtype='plain')
#     ezgmail.send('mshipp08@gmail.com', "Forecast for " + location,
#                  daily_memo, mimeSubtype='plain')


# # write_memo(location)
# # send_email()
# # schedule.every().day.at("11:10").do(
# #     write_memo, target_location=location)
# # schedule.every().day.at("11:12").do(send_email)

# # while True:
# #     schedule.run_pending()
# #     time.sleep(1)
