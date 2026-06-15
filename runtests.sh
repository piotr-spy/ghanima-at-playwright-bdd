#!/bin/bash
# Remove temp folders
rm -rf allure-report allure-results
# Run tests
echo "
        ===============================================
        =                                             =
        =                RUNNING TESTS                =
        =                                             =
        ===============================================
        "
# Device list: desktopHD, desktop1440p, iphone14ProMax, galaxyS20Ultra
# Browser list: chrome, safari, firefox
# Regression: @TESTPLAN_AM2S-5026
ENV="stage" DEVICE="desktopHD" BROWSERS=("chrome" "safari" "firefox") HEADLESS="false" TAGS="@Regression"

# Run tests for each browser combination
for BROWSER in "${BROWSERS[@]}"; do
  ENV=$ENV DEVICE=$DEVICE BROWSER=$BROWSER HEADLESS=$HEADLESS TAGS="$TAGS" \
  npx cucumber-js --format-options '{"resultsDir":"'"allure-results/${DEVICE}-${BROWSER}"'"}'

  echo "
        ===============================================
        =                                             =
        =           GENERATING HTML REPORT            =
        =                                             =
        ===============================================
        "
  allure generate "allure-results/${DEVICE}-${BROWSER}" --clean --single-file -o "allure-report/${DEVICE}-${BROWSER}"
  echo "Report for $BROWSER-$DEVICE: allure-report/${DEVICE}-${BROWSER}/index.html"
done

echo "
        ===============================================
        =                                             =
        =              TEST RUN COMPLETE              =
        =                                             =
        ===============================================
        "