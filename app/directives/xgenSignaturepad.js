'use strict';
define(['app'], function (app) {
    app.register.directive('xgenSignaturepad', function (CommonFct) {
        return {
            restrict: 'A',
            scope: {
                signature: '='
            },
            templateUrl: 'Views/RMS/common/SignatureCapture.html',
            link: function (scope, element, attrs) {
                var userinfo = CommonFct.MessageService.LoginInfo;
                var loginUser = userinfo.FirstName + ' ' + userinfo.LastName;
                var date = new Date();
                var dformat = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
                var mousePressed = false;
                var lastX, lastY;
                var ctx;

                //#region Digital

                scope.openSignaturePopup = function () {
                    scope.OnClear();
                    scope.txtSignFooter = 'Digital signed by ' + loginUser + ' on ' + dformat;
                    require(["Views/RMS/common/SignatureCaptureService"], function () {
                        require(["Views/RMS/common/SignatureCaptureCtrl"], function () {
                            var windowInstance = CommonFct.commonWindow.CommonWindowPopup(150, "430", "Digital Signature", "Views/RMS/common/SignaturePad.html", 'SignatureCaptureCtrl', { params: { Type: "Enroll" } });
                            windowInstance.result.then(function (result) {
                                scope.SetImage(result);
                            });
                        });
                    });
                }

                //#endregion Digital

                //#region Browse

                scope.OnBrowse = function () {
                    scope.OnClear();
                    scope.txtSignFooter = 'Browse signed by ' + loginUser + ' on ' + dformat;
                    $('#fileSignature').click();
                }

                scope.isValidImage = function (e) {
                    if (e.value != "") {
                        var ValidFileExtension = ['jpg', 'jpeg', 'png'];
                        if ($.inArray($("#fileSignature").val().split('.').pop().toLowerCase(), ValidFileExtension) == -1) {
                            toastr.error("Only jpg/jpeg/png image is allowed.");
                            scope.OnClear();
                            return;
                        }
                        if ($("#fileSignature").get(0).files.length > 0 && ($("#fileSignature").get(0).files[0].size / 1024 / 1024) > 1) {
                            toastr.error("Image size cannot be more than 1 MB.");
                            scope.OnClear();
                            return;
                        }
                        scope.readURL(document.getElementsByName("file")[0], "imgSignature");
                    }
                }

                scope.readURL = function (input, imgID) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            scope.SetImage(scope.GetBase64String(e.target.result));
                        }
                        reader.readAsDataURL(input.files[0]);
                    }
                }

                //#endregion Browse

                //#region On Screen

                scope.OnScreen = function () {
                    scope.OnClear();
                    scope.txtSignFooter = 'Manually signed by ' + loginUser + ' on ' + dformat;
                    scope.InitCanvas();
                }

                scope.InitCanvas = function () {
                    ctx = document.getElementById('cnvSignature').getContext("2d");

                    $('#cnvSignature').mousedown(function (e) {
                        mousePressed = true;
                        scope.Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
                    });

                    $('#cnvSignature').mousemove(function (e) {
                        if (mousePressed) {
                            scope.Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
                        }
                    });

                    $('#cnvSignature').mouseup(function (e) {
                        mousePressed = false;
                    });
                    $('#cnvSignature').mouseleave(function (e) {
                        mousePressed = false;
                    });
                }

                scope.Draw = function (x, y, isDown) {
                    if (isDown && ctx != null) {
                        ctx.beginPath();
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = 1;
                        ctx.lineJoin = "round";
                        ctx.moveTo(lastX, lastY);
                        ctx.lineTo(x, y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    lastX = x; lastY = y;
                    // Update Signature Value
                    scope.signature = document.getElementById('cnvSignature').toDataURL("image/jpg", 0.5).replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                }

                scope.clearArea = function () {
                    // Use the identity matrix while clearing the canvas
                    if (ctx != null) {
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                        ctx = null;
                    }
                }

                //#endregion On Screen

                //#region Common

                scope.GetBase64String = function (img) {
                    return img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                }

                scope.OnClear = function () {
                    scope.txtSignFooter = '';
                    scope.signature = ''
                    $('#cnvSignature').show();
                    $('#imgSignature').hide();
                    $('#fileSignature').val("");
                    scope.clearArea();
                }

                scope.SetImage = function (imgString) {
                    if (angular.isDefined(imgString) && imgString != '') {
                        scope.signature = imgString;
                        $('#cnvSignature').hide();
                        $('#imgSignature').show();
                        document.getElementById('imgSignature').setAttribute('src', 'data:image/jpg;base64,' + imgString);
                    } else {
                        scope.OnClear();
                    }
                }

                scope.$watch('signature', function (newVal, oldVal) {
                    if (scope.signature == '' || !angular.isDefined(scope.signature))
                        scope.OnClear();
                }, true);

                //#endregion Common
            },
        }
    });
});