/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(['require', 'intro'], function(require, IntroJs) {
    'use strict';
    var Intro = {};
    Intro.Start = function() {

        var intro = IntroJs();
        intro.setOptions({

            skipLabel: "Close",

            showBullets : false,

            steps: [{
                element: $('[data-id="troubleshoot"]').get(0),
                intro: "Welcome to Log Search!  Choose Troubleshooting to display high-level log and usage aggregates for all services and components in your cluster.",
                position: "right"
            }, {
                element: $('#troubleShootHeader').get(0),
                intro: "Choose a Service to display high-level information about that service. Optionally, filter by components and apply a specific diagnostic time frame.",
                position: "bottom"
            }, {
                element: $('div[data-id="dateRange"] .selectDateRange').get(0),
                intro: "Click the Date-Time picker and choose a pre-defined time slot or specify date and time values.",
                position: "top"
            }, {
                element: $("#showServicelog").get(0),
                intro: "Choose Go To Logs to further refine your examination of Service Logs for a selected service.",
                position: "top"
            }, {
                element: $('[data-id="hierarchy"]').get(0),
                intro: "Service Logs displays a high-level history of logs generated by a selected service and allows you to filter logs by component. You control your view of log data per component and host, Choose to view aggregate Service Logs or drill into details of each log message.",
                position: "right"
            }, {
                element: $("#searchIncludeExclude").get(0),
                intro: "This filter allows you to query the log data column wise(log_message, level, host etc). Include Search is basically \"or\" condition and Exclude Search is \"and\" condition between multiple input.",
                position: "top"
            }, {
                element: $("#compInculdeExculde").get(0),
                intro: "This filter allows you to filter the log data depending upon the component selection. Include Component is again \"or\" condition and Exclude Component is \"and\" condition between multiple selection.",
                position: "top"
            }, {
                element: $('#r_EventHistory').get(0),
                intro: "Event History displays the current, filtered query results.",
                position: "top"
            }, {
                element: $('#r_Histogram').get(0),
                intro: "Histogram displays comparative ratios of log severity during the currently defined time filter.",
                position: "top"
            }, {
                element: document.querySelectorAll('#r_BubbleTable')[1],
                intro: "The Log Data default view displays consolidated for all hosts.",
                position: "top",
                child: 'li[data-parent="true"]'
            }, {
                element: document.querySelectorAll('#r_BubbleTable')[1],
                intro: "Expand the Log Data tree view and choose components to further refine your diagnostics.",
                position: "top",
                child: 'li[data-parent="true"]'
            }, {
                element: $(document.querySelectorAll('#r_BubbleTable')[1]).find('.box-content')[1],
                intro: "Choose the blue arrow icon to view logs for a specific component on a new tab.",
                position: "right",
                child: 'li[data-parent="true"]'
            }, {
                element: document.querySelectorAll('#r_BubbleTable')[1],
                intro: "Choose Service Logs to show a column-separated view of actual log entries.",
                position: "top",
                child: 'li[data-parent="true"]'
            }, {
                element: $(document.querySelectorAll('#r_BubbleTable')[1]).find('td.logTime:first').get(0),
                intro: "The Log Time column lists a consolidated view of filtered log entries for the selected service.",
                position: "right"
            }, {
                element: $('li[data-id="audit"]').get(0),
                intro: "The Access Logs tab displays access information across services and their components. You can create different views and aggregations and apply filters for viewing access log details.",
                position: "right"
            }, {
                element: $('#r_AuditLine').get(0),
                intro: "The Line section shows component access during a specific time frame.",
                position: "bottom"
            }, {
                element: $('#AuditSearch').get(0),
                intro: "This filter allows you to query Access log data column- wise (Access Enforcer, Access type etc). Include Search applies the \"or\" condition and Exclude Search the \"and\" condition between multiple inputs.",
                position: "top"
            }, {
                element: $('li[data-id="createFilters"]').get(0),
                intro: "The Log Feeder Filter feature supports limiting data handled by LogSearch. For example, you can limit logs tracked by LogSearch to only those logs with level ERROR or FATAL.",
                position: "left"
            }].filter(function(obj) {
                if (obj.child)
                    return $(obj.element).find(obj.child).length
                return $(obj.element).length;
            }),
            'exitOnOverlayClick': false
        });
        Intro.bindEvent(intro)

        this.dataAttribute = $('div[role="tabpanel"]').find('.nav-tabs .active').attr('data-id');
        if (this.dataAttribute != "troubleshoot") {
            $('div[role="tabpanel"]').find('.nav-tabs [data-id="troubleshoot"] a').click();
        }
        intro.start();

        //Hiding Back button
        $('.introjs-prevbutton').hide();

        if ($('#r_EventHistory').find(".fa-chevron-down").length > 0) {
            $('#r_EventHistory').find('a.collapse-link').click();
        }
        if ($('#r_Histogram').find(".fa-chevron-down").length > 0) {
            $('#r_Histogram').find('a.collapse-link').click();
            this.histoGram = true;
        }
        if ($(document.querySelectorAll('#r_BubbleTable')[1]).find(".fa-chevron-down").length > 0) {
            $(document.querySelectorAll('#r_BubbleTable')[1]).find('a.collapse-link').click();
            this.bubbleGraph = true;
        }
        var overlay = document.createElement('div');
        overlay.setAttribute('class', 'overlayIntro');
        $('body').append(overlay);

    };

    Intro.bindEvent = function(intro) {

        var that = this;
        var options = {
            0: {
                css: {
                    'top': '0px',
                    'left': '98px'
                },
                handDirection: 'down',
                handClass: "up-down"
            },
            1: {
                css: {
                    'top': '0px',
                    'left': '98px'
                },
                handDirection: 'down',
                handClass: "up-down"
            },
            2: {
                css: {
                    'top': '0',
                    'right': '95px'
                },
                handDirection: 'left',
                handClass: "left-right"
            },
            3: {
                css: {
                    'top': '0',
                    'left': '40px'
                },
                handDirection: 'right',
                handClass: "left-right"
            },
            4: {
                css: {
                    'top': '0px',
                    'left': '98px'
                },
                handDirection: 'down',
                handClass: "up-down"
            },
            5: {
                css: {
                    'top': '10px',
                    'left': '10px'
                },
                handDirection: 'right',
                handClass: "right-left"
            },
            6: {
                css: {
                    'top': '10px',
                    'left': '10px'
                },
                handDirection: 'right',
                handClass: "right-left"
            },
            7: {
                css: {
                    'top': '38px',
                    'left': '98px'
                },
                handDirection: 'down',
                handClass: "up-down"
            },
            8: {
                css: {
                    'top': '38px',
                    'left': '98px'
                },
                handDirection: 'up',
                handClass: "up-down"
            },
            9: {
                css: {
                    'top': '38px',
                    'left': '98px'
                },
                appendIndex: 0,
                handDirection: 'down',
                handClass: "up-down"
            },
            10: {
                css: {
                    'top': '14px',
                    'left': '142px'
                },
                appendIndex: 1,
                handDirection: 'left',
                handText: "Components",
                handClass: "left-right"

            },
            11: {
                css: {
                    'top': '45px',
                    'right': '0'
                },
                appendIndex: 0,
                handDirection: 'left',
                handClass: "left-right"
            },
            12: {
                css: {
                    'top': '25px',
                    'left': '190px'
                },
                appendIndex: 0,
                handDirection: 'up',
                handClass: "up-down"
            },
            13: {
                css: {
                    'top': '50%',
                    'left': '0'
                },
                appendIndex: 0,
                handDirection: 'up',
                handClass: "up-down"
            },
            14: {
                css: {
                    'top': '0',
                    'left': '0'
                },
                handDirection: 'right',
                handClass: "left-right"
            },
            15: {
                css: {
                    'top': '0',
                    'left': '0'
                },
                handDirection: 'right',
                handClass: "left-right"
            },
            16: {
                css: {
                    'top': '0',
                    'left': '0'
                },
                handDirection: 'right',
                handClass: "left-right"
            },
            17: {
                css: {
                    'top': '0',
                    'left': '0'
                },
                handDirection: 'right',
                handClass: "left-right"
            },
            18: {
                css: {
                    'top': '0',
                    'left': '0'
                },
                handDirection: 'right',
                handClass: "left-right"
            }
        }


        //Onafter step Callback
        intro.onafterchange(function(targetElement) {
            if (this._currentStep == 0) {

            } else if (this._currentStep == 1) {
                scroll(targetElement, -200);
            } else if (this._currentStep == 2) {
                // scroll(targetElement, 0);
            }else if (this._currentStep == 3) {
                // scroll(targetElement, 0);
            } else if (this._currentStep == 4) {
                // scroll(targetElement, 0);
            } else if (this._currentStep == 5) {
                // scroll(targetElement, 0);
            } else if (this._currentStep == 6) {
               
            } else if (this._currentStep == 7) {
                
            } else if (this._currentStep == 8) {
                scroll(targetElement, -200);
            } else if (this._currentStep == 9) {
                scroll(targetElement, -150);
            } else if (this._currentStep == 10) {
                scroll(targetElement, 0);
            } else if (this._currentStep == 1) {
                scroll(targetElement, -250);
            } else if (this._currentStep == 12) {
                scroll(targetElement, -150);
            } else if (this._currentStep == 13) {
                setTimeout(function() {
                    $(targetElement).mouseover();
                }, 100);
                setTimeout(function() {
                    $('#rLogTable').find('.btn-quickMenu').first().click();
                }, 800);
            } else if (this._currentStep == 14) {

            } else if (this._currentStep == 15) {

            }else if (this._currentStep == 16) {

            }


        });

        //OnBefore step Callback
        intro.onbeforechange(function(targetElement) {
            removeFingerAndOverlayDiv();
            if (this._currentStep == 0) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="troubleshoot"] a').click();
                dispatchResizeEvent();
            } else if (this._currentStep == 1) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="troubleshoot"] a').click();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 2) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="troubleshoot"] a').click();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 3) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="troubleshoot"] a').click();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 4) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                dispatchResizeEvent();
            } else if (this._currentStep == 5) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                dispatchResizeEvent();
            } else if (this._currentStep == 6) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                dispatchResizeEvent();
            } else if (this._currentStep == 7) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 8) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                $(targetElement).find('input[value="H"]').click();
                $(targetElement).find('li[data-parent="true"]').first().find('span[data-state="expand"]').first().click();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 9) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();               
                $(document.querySelectorAll('#r_BubbleTable')[1]).find('input[value="H"]').click();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 10) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                $(document.querySelectorAll('#r_BubbleTable')[1]).find('li[data-parent="true"]').first().find('span[data-state="collapse"]').first().click();
                $(document.querySelectorAll('#r_BubbleTable')[1]).find('input[value="H"]').click();
                $(targetElement).find('ul[role="group"]').find('li').first().mouseover();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 11) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                $(targetElement).find('input[value="T"]').click();
                $(targetElement).find('[data-id="r_tableList"]').css('height', '200px');
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 12) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
                $(document.querySelectorAll('#r_BubbleTable')[1]).find('input[value="T"]').click();
                dispatchResizeEvent();
                appendFingerAndOverlayDiv(targetElement, options[this._currentStep]);
            } else if (this._currentStep == 13) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="hierarchy"] a').click();
            } else if (this._currentStep == 14) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="audit"] a').click();
                dispatchResizeEvent();
            }else if (this._currentStep == 15) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="audit"] a').click();
                dispatchResizeEvent();
            }else if (this._currentStep == 15) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="audit"] a').click();
                dispatchResizeEvent();
            }else if (this._currentStep == 16) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="audit"] a').click();
                dispatchResizeEvent();
            }
        });

        //OnDone Callback
        intro.oncomplete(function() {
            $($('#r_EventHistory').get(0)).find('a.collapse-link').click();
            $(document.querySelectorAll('#r_BubbleTable')[1]).find('input[value="H"]').click();
            $(document.querySelectorAll('#r_BubbleTable')[1]).find('li[data-parent="true"]').first().find('span[data-state="expand"]').first().click();
            $(document.querySelectorAll('#r_BubbleTable')[1]).find('[data-id="r_tableList"]').css('height', '');
            removeFingerAndOverlayDiv(true);
            tabClick();
        });

        //OnSkip Callback
        intro.onexit(function(targetElement) {
            $(document.querySelectorAll('#r_BubbleTable')[1]).find('input[value="H"]').click();
            $(document.querySelectorAll('#r_BubbleTable')[1]).find('li[data-parent="true"]').first().find('span[data-state="expand"]').first().click();
            $('#r_EventHistory').find('a.collapse-link').click();
            $(document.querySelectorAll('#r_BubbleTable')[1]).find('[data-id="r_tableList"]').css('height', '');
            if (that.histoGram) {
                $('#r_Histogram').find('a.collapse-link').click();
            }
            if (that.bubbleGraph) {
                $(document.querySelectorAll('#r_BubbleTable')[1]).find('a.collapse-link').click();
            }
            removeFingerAndOverlayDiv(true);
            tabClick();
        });

        //remove all animation and overlay div
        function removeFingerAndOverlayDiv(overlay) {
            if (overlay) {
                $('body').find('.overlayIntro').remove();
            }
            $('body').find('.box-content .finger').remove();

        }
        //add all animation and overlay div
        function appendFingerAndOverlayDiv(targetElementObject, options) {

            if (options.appendIndex != undefined) {
                if ($(targetElementObject).find('.box-content').length == 0) {
                    $(targetElementObject).append('<div class="animated infinite finger ' + options.handClass + '"><i class="fa fa-hand-o-' + options.handDirection + ' fa-2x"></i></div>');
                    $(targetElementObject).find('.finger').css(options.css);
                } else {
                    $($(targetElementObject).find('.box-content')[options.appendIndex]).append('<div class="animated infinite finger ' + options.handClass + '"><i class="fa fa-hand-o-' + options.handDirection + ' fa-2x"></i></div>');
                    $($(targetElementObject).find('.box-content')[options.appendIndex]).find('.finger').css(options.css);
                }
            } else {
                var flag = $(targetElementObject).find('.box-content');
                if (flag.length != 0) {
                    $(targetElementObject).find('.box-content').append('<div class="animated infinite finger ' + options.handClass + '"><i class="fa fa-hand-o-' + options.handDirection + ' fa-2x"></i></div>');
                    $(targetElementObject).find('.box-content').find('.finger').css(options.css);
                } else {
                    $(targetElementObject).append('<div class="animated infinite finger ' + options.handClass + '"><i class="fa fa-hand-o-' + options.handDirection + ' fa-2x"></i></div>');
                    $(targetElementObject).find('.finger').css(options.css);
                }
            }

        }

        function scroll(targetElement, offsetPlus) {
            $('html,body').animate({
                scrollTop: (($(targetElement).offset().top) + offsetPlus)
            });
        }

        function dispatchResizeEvent() {
            setTimeout(function() {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }

        function tabClick() {
            if (!that.dataAttribute) {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id="troubleshoot"] a').click();
            } else {
                $('div[role="tabpanel"]').find('.nav-tabs [data-id=' + that.dataAttribute + '] a').click();
            }
            window.scrollTo(0, 0);
        }
    }
    return Intro;
});