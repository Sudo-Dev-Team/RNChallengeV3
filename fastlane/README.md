fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios app_center_and_TF_build

```sh
[bundle exec] fastlane ios app_center_and_TF_build
```

IOS build IPA then upload to TestFlight

### ios google_and_TF_build

```sh
[bundle exec] fastlane ios google_and_TF_build
```

IOS build IPA then upload to TestFlight

### ios code_push

```sh
[bundle exec] fastlane ios code_push
```

IOS code push

----


## Android

### android google_and_TF_build

```sh
[bundle exec] fastlane android google_and_TF_build
```

Android build apk then upload to app google play

### android app_center_and_TF_build

```sh
[bundle exec] fastlane android app_center_and_TF_build
```

Android build aab then upload to app center

### android code_push

```sh
[bundle exec] fastlane android code_push
```

Android code push

### android internal_build

```sh
[bundle exec] fastlane android internal_build
```

Android build aab then upload to internal testing

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
