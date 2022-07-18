Feature: Profiles Creation

#######################    Profiles Creation ##########################


##################################### Security Profile Creation ################################################

# Author: Chetan.S
# Last Updated: 
# Comments 
# Scenario_ID :
# TC_109
@prerequisite

#subscriber
Scenario:To verify that security profiles can be configured in the system for different type of users under different workspaces.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Security and click to select security profile
And Click on add profile select user type as subscriber and fill the details
And Fill the details-Subscriber Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-PinRestrictions
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm

# Administrator -- BusinessAdmin
When Navigate to Security and click to select security profile
And Click on add profile select user type as BusinessAdmin and fill the details
And Fill the details-BusinessAdmin Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm

#Administrator -- CustomercareAdmin 
When Navigate to Security and click to select security profile
And Click on add profile select user type as CustomercareAdmin and fill the details
And Fill the details-CustomercareAdmin Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm


#Business -- Distributer---(pin present)
When Navigate to Security and click to select security profile
And Click on add profile select user type as Distributer and fill the details
And Fill the details-Distributer Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-PinRestrictions
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm


#Business -- TelcoOperator --(pin Present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as TelcoOperator and fill the details
#And Fill the details-TelcoOperator Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- ATMMachine
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as ATMMachine and fill the details
#And Fill the details-ATMMachine Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- HeadMerchant-----(Pin present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as HeadMerchant and fill the details
#And Fill the details-HeadMerchant Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- PaymentGateway
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as PaymentGateway and fill the details
#And Fill the details-PaymentGateway Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- Biller-(PIN Present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Biller and fill the details
#And Fill the details-Biller Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- Employee-(Pin Present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Employee and fill the details
#And Fill the details-Employee Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- Merchant-(Pin Present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Merchant and fill the details
#And Fill the details-Merchant Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- Agent - (Pin Present)
# When Navigate to Security and click to select security profile
# And Click on add profile select user type as Agent and fill the details
# And Fill the details-Agent Profile Name
# And Fill the details-PasswordRestrictios
# And Fill the details-PinRestrictions
# And Fill the details-AuthRestrictions
# And Fill the details-loginRestrictions
# Then Click on add and confirm


#Business -- Corporate -- (Pin present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Corporate and fill the details
#And Fill the details-Corporate Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- SuperAgent --(pin present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as SuperAgent and fill the details
#And Fill the details-SuperAgent Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


    