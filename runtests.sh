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
  npx cucumber-js
done

echo "
        ===============================================
        =                                             =
        =              TEST RUN COMPLETE              =
        =                                             =
        ===============================================
        "