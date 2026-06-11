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
ENV="stage" DEVICE="desktopHD" BROWSERS=("chrome" "safari" "firefox") HEADLESS="true" TAGS=""

echo "
        ===============================================
        =                                             =
        =              TEST RUN COMPLETE              =
        =                                             =
        ===============================================
        "