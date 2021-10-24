---
home: false
title: App Customization Guide
footer: Alternova Inc
---
<Block>

# App Customization Guide

Note: these features are currently only available on the currently experimental swiftui branch of the CardinalKit repository

CardinalKit provides quick customization options for your health research application through the CKConfiguration.plist file. This file is a spreadsheet that maps CardinalKit-defined keys to user-selected values. This reference shows you how to customize that file to suit your needs. Every key must have a value or the app will crash.

</br>
<img src="../images/swiftui.png" alt="drawing" width="650"/>

<br>
</Block>
<Block>
The default CardinalKit sample app with no CKConfiguration.plist changes.

### CKConfiguration Keys and Values

| Key                          | Values                                                                                                                               |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Study Title                  | The title of your application                                                                                                        |
| Team Name                    | The name of your team or department                                                                                                  |
| Email                        | A support email for users to contact                                                                                                 |
| Phone                        | A support phone number for users to contact                                                                                          |
| Copyright                    | A copyright/informative statement that shows up at the bottom of the Profile view                                                    |
| Website                      | A website URL with more information about your app                                                                                   |
| Tint Color                   | A hexadecimal color for secondary text and iconography in ResearchKit popovers (i.e. #b6133f)                                        |
| Primary Color                | A hexadecimal color for buttons and text throughout the CardinalKit app                                                              |
| Review Consent Step Text     | Text for consent form review                                                                                                         |
| Consent File Name            | Name of saved consent pdf file                                                                                                       |
| Reason for Consent Text      | Text for consent alert                                                                                                               |
| Passcode Text                | Text for passcode selection                                                                                                          |
| Passcode Type                | 4 or 6: The number of numbers in the passcode                                                                                        |
| Completion Step Title        | Title for completing onboarding                                                                                                      |
| Completion Step Text         | Subtext for completing onboarding                                                                                                    |
| Failed Login Title           | Title for failing login                                                                                                              |
| Failed Login Text            | Subtext for failing login                                                                                                            |
| Health Permissions Title     | Title for requesting health permissions                                                                                              |
| Health Records               | Access user health records using Apple's FHIRModels by setting Enabled to 1                                                          |
| Health Permissions Text      | Subtext for requesting health permisions                                                                                             |
| Background Read Frequency    | immediate, hourly, daily, or weekly: How often to read from HealthKit data records                                                   |
| Login-Sign-In-With-Apple     | See below                                                                                                                            |
| Login-Passwordless           | Sign in using a passwordless setup (this process also needs to be activated on Firebase — refer to our documentation to get started) |
| Login Step Title             | Title for logging in                                                                                                                 |
| Login Step Text              | Subtext for logging in                                                                                                               |
| Withdrawal Instruction Title | Title for withdrawal step                                                                                                            |
| Withdrawal Instruction Text  | Subtext for withdrawal step                                                                                                          |
| Withdraw Title               | Title to show after withdrawing                                                                                                      |
| Withdraw Text                | Subtext to show after withdrawing                                                                                                    |
| Passcode On Return Text      | Text to show when user returns to app and sees passcode request                                                                      |
| Consent Title                | Title of consent form document                                                                                                       |
| Use Carekit                  | Enable a CareKit dashboard as a tab in the application                                                                               |
| HealthKit Data to Read       | A list of HealthKit Object types to read from the user (see: HealthKit Object Types)                                                 |
| Consent Form                 | See below. At least 1 section is required.                                                                                           |
| Onboarding                   | See below. At least 1 panel is required.                                                                                             |

<Example>

### Consent Form Specifications

The values to this element in the file will construct the consent process. At least 1 section is required.

| Consent Form Items |
|--------------------|
| Overview           |
| Data Gathering     |
| Privacy            |
| Data Use           |
| Time Commitment    |
| Study Survey       |
| Study Tasks        |
| Withdrawing        |

</Example>

</Block>
<Block>



### Onboarding Specifications

The ```Onboarding``` key is an array of dictionary items. Each dictionary represents a single panel in the onboarding paging view.



| Key         | Value                           |
|-------------|---------------------------------|
| Title       | A title for the page            |
| Description | A description for the page      |
| Logo        | An emoji or number for the page |

<Example>

### Sign in with Apple

The ```Login-Sign-In-With-Apple``` key is an array of dictionary items. Before turning this feature on, make sure you have taken care of the necessary setup.

| Key     | Value                                     |
|---------|-------------------------------------------|
| Enabled | Whether Apple sign in is enabled (1 or 0) |
| Title   | A title for the sign in invocation        |
| Text    | Text to go with the sign in process       |

</Example>


</Block>