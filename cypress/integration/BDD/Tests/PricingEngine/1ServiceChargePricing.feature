Feature:ServiceChargePricing

# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_27 
@test

Scenario:To verify that System admin should be able to view pricing engine module on web.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
Then System admin should be able to view pricing engine module on web.


# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_28
@test

Scenario:To verify that User other than System admin should not able to view pricing engine module on web.
Given Login into Mobiquity Portal as Super admin Maker
Then User other than System admin should not able to view pricing engine module on web.


# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_29 
@test

Scenario:To verify that user should be redirected to a new page for pricing engine.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
Then User should be redirected to a new page for pricing engine.

# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_30

@test

Scenario:To verify that System admin should be able to add initiate service charge through Pricing engine module successfully.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on the Service Policy
And Click on any service to add service charge.




# Author: Arpitha C
# Last Updated: 2/05/2022
# Comments : Service Charge Pricing Module Test Cases
# Scenario_ID : SC_32
@test


Scenario:To verify that user should also be able to make commission profile with the same pricing engine module.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on commission 
And Click on commission and select the service you want to add commission profile for

# Author: Chetan.S
# Last Updated: 29-04-2022
# Comments 
# Scenario_ID :
# TC_33
@test

Scenario:To verify that user should be able to calculate service charge using pricing calculator.
Given Login into Mobiquity Portal as System admin Maker
When Click on Pricing Engine
And Click on Pricing Caluclator
And Enter the party Details
And Enter Other Details
Then Calculate Service Charge
