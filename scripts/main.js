var canvas, engine, scene;
var cube = [];
var speed = 400;
var disableButton = false;
var SPINNING_TIME = 500;

function createUI() {
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new BABYLON.GUI.StackPanel();
    panel.width = 0.25;
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    advancedTexture.addControl(panel);

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "RotateX");
    button1.width = 0.2;
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    button1.onPointerUpObservable.add(function () {
        if (!disableButton) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[0][i][j], -Math.PI / 2, 'x');
                }
            }
            cube = _rotateArray(cube, 0, 'x');
            disableButton = true;
            setTimeout(function(){
                disableButton = false;
            }, SPINNING_TIME)
        }

    });
    panel.addControl(button1);

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but1", "RotateY");
    button2.width = 0.2;
    button2.height = "40px";
    button2.color = "white";
    button2.cornerRadius = 20;
    button2.background = "green";
    button2.onPointerUpObservable.add(function () {
        if (!disableButton) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][2][j], -Math.PI / 2, 'y');
                }
            }
            cube = _rotateArray(cube, 2, 'y');
            disableButton = true;
            setTimeout(function(){
                disableButton = false;
            }, SPINNING_TIME)
        }
    });
    panel.addControl(button2);

    var button3 = BABYLON.GUI.Button.CreateSimpleButton("but1", "RotateZ");
    button3.width = 0.2;
    button3.height = "40px";
    button3.color = "white";
    button3.cornerRadius = 20;
    button3.background = "green";
    button3.onPointerUpObservable.add(function () {
        if (!disableButton) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][j][0], -Math.PI / 2, 'z');
                }
            }
            cube = _rotateArray(cube, 0, 'z');
            disableButton = true;
            setTimeout(function(){
                disableButton = false;
            }, SPINNING_TIME)
        }

    });
    panel.addControl(button3);

    var button4 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Spin");
    button4.width = 0.2;
    button4.height = "40px";
    button4.color = "white";
    button4.cornerRadius = 20;
    button4.background = "green";
    button4.onPointerUpObservable.add(function () {
        if(!disableButton){
            randomRotate();
            disableButton = true;
        }
    });
    panel.addControl(button4);
}

function randomRotate() {
    var rand = Math.floor(Math.random() * 9);
    switch (rand) {
        case 0:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[0][i][j], -Math.PI / 2, 'x');
                }
            }
            cube = _rotateArray(cube, 0, 'x');
            break;
        case 1:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[1][i][j], -Math.PI / 2, 'x');
                }
            }
            cube = _rotateArray(cube, 1, 'x');
            break;
        case 2:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[2][i][j], -Math.PI / 2, 'x');
                }
            }
            cube = _rotateArray(cube, 2, 'x');
            break;
        case 3:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][0][j], -Math.PI / 2, 'y');
                }
            }
            cube = _rotateArray(cube, 0, 'y');
            break;
        case 4:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][1][j], -Math.PI / 2, 'y');
                }
            }
            cube = _rotateArray(cube, 1, 'y');
            break;
        case 5:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][2][j], -Math.PI / 2, 'y');
                }
            }
            cube = _rotateArray(cube, 2, 'y');
            break;
        case 6:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][j][0], -Math.PI / 2, 'z');
                }
            }
            cube = _rotateArray(cube, 0, 'z');
            break;
        case 7:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][j][1], -Math.PI / 2, 'z');
                }
            }
            cube = _rotateArray(cube, 1, 'z');
            break;
        case 8:
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    rotate(cube[i][j][2], -Math.PI / 2, 'z');
                }
            }
            cube = _rotateArray(cube, 2, 'z');
            break;
    }

    setTimeout(function () {
        randomRotate();
    }, 1000);
}

function bootstrap(){
    if (BABYLON.Engine.isSupported()) {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);

        BABYLON.SceneLoader.Load("", "scenes/main.babylon", engine, function (newScene) {
            scene = newScene;
            newScene.executeWhenReady(function () {

                createUI();
                for (var i = 0; i < 3; i++) {
                    cube[i] = [];
                    for (var j = 0; j < 3; j++) {
                        cube[i][j] = [];
                        for (var k = 0; k < 3; k++) {
                            cube[i][j][k] = newScene.getMeshByName(i + ',' + j + ',' + k);
                        }
                    }
                }

                engine.runRenderLoop(function () {
                    newScene.render();
                });

            });
            window.addEventListener('resize', function () {
                engine.resize();
            });

        }, function (progress) {
        });
    }
}

function rotate(object, angle, _dimension) {
    var dimension = _dimension || 'x';

    switch (dimension) {
        case 'x':
            _rotateAroundX(object, angle, false);
            break;
        case 'y':
            _rotateAroundY(object, angle, false);
            break;
        case 'z':
            _rotateAroundZ(object, angle, false);
            break;

    }
}

var _rotateAroundX = function (object, angle, reverseRotation) {
    object.animations = [];
    var distance = Math.sqrt(
        Math.pow((object.position.z), 2) +
        Math.pow((object.position.y), 2)
    );
    var actualRotation = Math.atan2(object.position.z, object.position.y);

    var animationPosition = new BABYLON.Animation(
        "animationPosition",
        "position",
        speed,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    var animationKeys = [];
    animationKeys.push({
        frame: 0,
        value: new BABYLON.Vector3(
            object.position.x,
            object.position.y,
            object.position.z
        )
    });
    for (var i = 1; i <= 100; i++) {
        var stepAngle = (angle / 100) * i;
        animationKeys.push({
            frame: i,
            value: new BABYLON.Vector3(
                object.position.x,
                Math.cos(actualRotation + stepAngle) * distance,
                Math.sin(actualRotation + stepAngle) * distance
            )
        });
    }
    animationPosition.setKeys(animationKeys);

    object.animations.push(animationPosition);

    object.rotate(BABYLON.Axis.X, angle, BABYLON.Space.WORLD);
    var lastRotationQuaternion = object.rotationQuaternion.clone();
    object.rotate(BABYLON.Axis.X, -angle, BABYLON.Space.WORLD);

    animationKeys = [{
        frame: 0,
        value: object.rotationQuaternion
    }, {
        frame: 100,
        value: lastRotationQuaternion
    }
    ];


    var animationRotation = new BABYLON.Animation(
        "animationRotation",
        "rotationQuaternion",
        speed,
        BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    animationRotation.setKeys(animationKeys);
    object.animations.push(animationRotation);

    scene.beginAnimation(object, 0, 100, false);

};

var _rotateAroundY = function (object, angle, reverseRotation) {

    object.animations = [];
    var distance = Math.sqrt(
        Math.pow((object.position.x), 2) +
        Math.pow((object.position.z), 2)
    );
    var actualRotation = Math.atan2(object.position.z, object.position.x);

    var animationPosition = new BABYLON.Animation(
        "animationPosition",
        "position",
        speed,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    var animationKeys = [];
    animationKeys.push({
        frame: 0,
        value: new BABYLON.Vector3(
            object.position.x,
            object.position.y,
            object.position.z
        )
    });
    for (var i = 1; i <= 100; i++) {
        var stepAngle = (angle / 100) * i;
        animationKeys.push({
            frame: i,
            value: new BABYLON.Vector3(
                Math.cos(actualRotation + stepAngle) * distance,
                object.position.y,
                Math.sin(actualRotation + stepAngle) * distance
            )
        });
    }
    animationPosition.setKeys(animationKeys);
    object.animations.push(animationPosition);

    object.rotate(BABYLON.Axis.Y, -angle, BABYLON.Space.WORLD);
    var lastRotationQuaternion = object.rotationQuaternion.clone();
    object.rotate(BABYLON.Axis.Y, angle, BABYLON.Space.WORLD);

    animationKeys = [{
        frame: 0,
        value: object.rotationQuaternion
    }, {
        frame: 100,
        value: lastRotationQuaternion
    }
    ];


    var animationRotation = new BABYLON.Animation(
        "animationRotation",
        "rotationQuaternion",
        speed,
        BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    animationRotation.setKeys(animationKeys);
    object.animations.push(animationRotation);
    scene.beginAnimation(object, 0, 100, false);


};

var _rotateAroundZ = function (object, angle, reverseRotation) {
    object.animations = [];
    var distance = Math.sqrt(
        Math.pow((object.position.x), 2) +
        Math.pow((object.position.y), 2)
    );
    var actualRotation = Math.atan2(object.position.x, object.position.y);

    var animationKeys = [];
    var animationPosition = new BABYLON.Animation(
        "animationPosition",
        "position",
        speed,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    animationKeys.push({
        frame: 0,
        value: new BABYLON.Vector3(
            object.position.x,
            object.position.y,
            object.position.z
        )
    });
    for (var i = 1; i <= 100; i++) {
        var stepAngle = (angle / 100) * i;
        animationKeys.push({
            frame: i,
            value: new BABYLON.Vector3(
                Math.sin(actualRotation + stepAngle) * distance,
                Math.cos(actualRotation + stepAngle) * distance,
                object.position.z
            )
        });
    }
    animationPosition.setKeys(animationKeys);

    object.animations.push(animationPosition);

    object.rotate(BABYLON.Axis.Z, -angle, BABYLON.Space.WORLD);
    var lastRotationQuaternion = object.rotationQuaternion.clone();
    object.rotate(BABYLON.Axis.Z, angle, BABYLON.Space.WORLD);

    animationKeys = [{
        frame: 0,
        value: object.rotationQuaternion
    }, {
        frame: 100,
        value: lastRotationQuaternion
    }
    ];


    var animationRotation = new BABYLON.Animation(
        "animationRotation",
        "rotationQuaternion",
        speed,
        BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    animationRotation.setKeys(animationKeys);
    object.animations.push(animationRotation);

    scene.beginAnimation(object, 0, 100, false, 1, function () {

    });
};

var _rotateArray = function (arr, fixedPos, _dimension) {
    var dimension = _dimension || 'x';
    var rotArr = [];
    switch (dimension) {
        case 'x':
            for (var i = 0; i < 3; i++) {
                rotArr[i] = [];
                for (var j = 0; j < 3; j++) {
                    rotArr[i][j] = arr[fixedPos][2 - j][i];
                }
            }
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    arr[fixedPos][i][j] = rotArr[i][j];
                }
            }
            break;
        case 'y':
            for (var i = 0; i < 3; i++) {
                rotArr[i] = [];
                for (var j = 0; j < 3; j++) {
                    rotArr[i][j] = arr[2 - j][fixedPos][i];
                }
            }
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    arr[i][fixedPos][j] = rotArr[i][j];
                }
            }
            break;
        case 'z':
            for (var i = 0; i < 3; i++) {
                rotArr[i] = [];
                for (var j = 0; j < 3; j++) {
                    rotArr[i][j] = arr[j][2 - i][fixedPos];
                }
            }
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    arr[i][j][fixedPos] = rotArr[i][j];
                }
            }
            break;
    }

    return arr;
};

bootstrap();