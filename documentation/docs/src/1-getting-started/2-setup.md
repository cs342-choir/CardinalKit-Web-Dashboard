---
home: false
title: Set Up Application Infrastructure
footer: Alternova Inc
---

<Block>

# Set Up Application Infrastructure

<!-- ![image](../images/doctors.svg) -->

Prior to CardinalKit, researchers would need to implement a backend solution of their choosing so data that their subjects were gathering could be securely stored. CardinalKit leverages existing database architecture on the Google Cloud platform to make it as frictionless as possible to get started with collecting information on your users.
## Create a new Firebase Database

<img src="../images/connect.svg" alt="drawing" width="250"/>

</Block>

<Block>

## 1. Make a Firebase Account

Head on over to firebase.google.com and set up an account.
Note: you may need to use your personal email instead of your university assigned one.

<Example>

```
firebase.google.com
```

</Example>

</Block>

<Block>

## 2. Set up a New Firebase Instance

Go to your Firebase console (top right) and add a new project. Name the project to be something related to your app for future reference.

It is important that you disable Google Analytics because it is not BAA compliant and then create your project. It will will take around a minute to set up.

<Example>

<img src="../images/google-analytics.png" alt="drawing" width="400"/>

</Example>

</Block>

<Block>

</br>
Once ready, click "continue". Click "Database" under the "Develop" section in the sidebar, and then "Create database".
</br>
</br>
<img src="../images/firebase-database.png" alt="drawing" width="950"/>

<Example>

</Example>

</Block>

<Block>

</br>
</br>

Be sure to start the database in test mode so your research IT can configure the rules for the storage.

</br>

::: danger
Why? When developing and testing your application, it is fine to use your own custom Firebase backend. However, in production, it is easier to hand-off database maintenance to your IT department (e.g. Stanford Medicine IT). Their configuration will be guaranteed to be HIPAA compliant.
:::

</Block>

<!-- 
<Block>

## 3. Open the Project

Open the folder once it is finished downloading. Navigate to the "CardinalKit.xcworkspace" file located in the "CardinalKit-Example" folder within the download. You should see something like this. Open the "CardinalKit.xcworkspace" file. Xcode should automatically launch with the project open. This is a sample app that you will customize to meet your needs. Xcode will start indexing your project and will display Indexing | Processing Files for a few minutes in the top bar. You don't need to wait for this process to complete in order to continue with this guide.

<img src="../images/folder.png" alt="drawing" width="450"/>

<Example>

If a pop-up indicating that you opened a file downloaded from online appears, select "Open".

<img src="../images/downloaded.png" alt="drawing" width="450"/>

At some point during this process, the project may ask to request a part of your keychain with a chain of intrusive popups. In this case, type in your password and click "Always Allow". Xcode and this project is entirely local so this is safe.

</Example>

</Block>

<Block>
<section>

## 4. Configure the Project

Click on the main root project in the sidebar and change the iOS bundle ID and team to match your project. Remember the bundle ID for later since it will be needed to connect your database to the app. It should be of the form "com.[TEAM-NAME].[PROJECT-NAME]". Write down this bundle ID for later as it will be crucial in setting up the database component of the app.


<img src="../images/bundle.png" alt="drawing" width="450"/>

<Example>
</br>
</br>
</br>

If you get a status message that states "Unable to log in with account '[YOUR EMAIL]'" or "No profiles for '[YOUR BUNDLE ID]' were found", don't worry as your app should still compile and you should continue with this guide.

Once that is complete, your "Signing and Capabilities" page should look like this (with your team and project names):

<img src="../images/updated_bundle.png" alt="drawing" width="450"/>

</Example>
</section>
<section>
</br>
</br>
</br>
Finally, we need to set our app to use Swift 4.2. Select "Pods" (in the left hand sidebar) > "CardinalKit" (tucked away in a drawer indicated by the green box) > "Build Settings" > "Swift Compiler Language" > "Swift Language Version" > "Swift 4.2". This process is illustrated below. You will have to scroll a bit to get to this part of the file.

<img src="../images/swift.png" alt="drawing" width="750"/>

</section>

</Block>

<Block>

## 5. Wait for Reindexing to Complete

Xcode takes a while to open a project. Wait until Xcode is finished indexing the project. At the top of Xcode, there will be light blue progress bar showing this. Once it is complete, and no red errors pop up, we can run the project. This can take anywhere from 5 to 10 minutes.

<img src="../images/indexing.png" alt="drawing" width="750"/>

#### A Quick Aside: No such module ResearchKit and Other Errors

Your project may show several warnings indicated by a yellow triangle "⚠️" but that is fine. However, a red octogon with an exclamation mark indicates an error which prevents your app from running. One common issue many CardinalKit developers hit at this stage is an error No such module ResearchKit and they can't find a way to launch the sample app.

There are two ways to get around this issue:

</Block>
<Block>


1. Using git clone: clone the desired branch from Github with the following syntax in your shell: git clone --recurse-submodules <the_GitHub_url>. A common issue with prepackaged modules (in our case Firebase, ResearchKit, and CardinalKit) is that a simple download may install a reference to the module rather than the module itself.

<Example>

```bash

git clone --recurse-submodules <the_GitHub_url>

```

</Example>
</Block>
<Block>


2. Using pod: The fundamental issue in the app is that the modules (referenced via Cocoapods) are not actually installed. The solution is to navigate to the folder with the Podfile in the sample app using the command line (a good tutorial for those who are less familiar here). In the directory, run pod update and then run pod install. Building ResearchKit on your own device requires git-lfs. The best way to install this is through Homebrew by running brew install git-lfs. If it is your first time building ResearchKit from source, it may take anywhere from 5-20 minutes to fully install. The modules should be fully built now.

<Example>

```bash
# navigate to the folder with the Podfile
# run
pod update
# and then run
pod install

# Building ResearchKit requires git-lfs
# install this through Homebrew by running
brew install git-lfs
```

</Example>

</Block>
<Block>

3. If all else fails: a common panacea for Xcode related errors is cleaning the build folder and rerunning the application. Hit Cmd+Shift+K to clean the build folder, and try rebuilding the sample app.

</Block>

<Block>

## 6. Test app to see if it works

Specify the target for deployment. Select either your phone (if it is plugged in) or pick a device to simulate (we recommend iPhone 8). Press the "Play" button, shown in green below to run the app in the simulator. The first time you build the app, it will take 5 to 10 minutes due to it having to load all of the frameworks for the first time.

When the simulator boots up and opens up the app, you may be faced with a white screen for a few seconds to a minute. This is normal for the simulator on the first run of the app. Your project may show several warnings indicated by a yellow triangle "⚠️" but that is fine.


<img src="../images/set_target.png" alt="drawing" width="750"/>


</Block> -->