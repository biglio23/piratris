//-----------------------------------GRID MODULE-----------------------------------\\
var selectedItems = new Set();
var ModuleGrid =
{
    // Array of String used for randomization of the sprites
    sprites: null,
    // Array used for storing the cells of the game
    items: null,
    // Boolean used to disable the user input during the animations
    allowInput: true,
    // Array used for storing the cells selected
    selectedItems: new Set(),
    // Temp variable that store the last cell added
    lastAdded: null,
    
    preload: function()
    {
        game.load.image("background", "assets/background.png");
        game.load.image("coin", "assets/sprites/coin.png");
        game.load.image("hook", "assets/sprites/hook.png");
        game.load.image("parrot", "assets/sprites/parrot.png");
        game.load.image("saber", "assets/sprites/saber.png");
        game.load.image("ship", "assets/sprites/ship.png");
        game.load.image("starfish", "assets/sprites/starfish.png");
        game.load.image("treasure", "assets/sprites/treasure.png");
        sprites = ["coin", "hook", "parrot", "saber", "ship", "treasure", "starfish"];
        
        game.load.image("coin-ball", "assets/sprites/coin-ball.png");
        game.load.image("hook-ball", "assets/sprites/hook-ball.png");
        game.load.image("parrot-ball", "assets/sprites/parrot-ball.png");
        game.load.image("saber-ball", "assets/sprites/saber-ball.png");
        game.load.image("ship-ball", "assets/sprites/ship-ball.png");
        game.load.image("starfish-ball", "assets/sprites/starfish-ball.png");
        game.load.image("treasure-ball", "assets/sprites/treasure-ball.png");

    },

    create: function()
    {
        game.add.sprite(0, 0, "background");

        // fill the screen with as many gems as possible
        spawnBoard();

        allowInput = true;

        game.input.addMoveCallback(clickItem, this);
    }
}

/*
###########################
#    CONTROL FUNCTIONS    #
###########################
*/

function dropItems() {

    var dropRowCountMax = 0;

    for (var i = 0; i < BOARD_COLS; i++)
    {
        var dropRowCount = 0;

        for (var j = BOARD_ROWS - 1; j >= 0; j--)
        {
            var item = getItem(i, j);
            if (item === null)
            {
                dropRowCount++;
            }
            else if (dropRowCount > 0)
            {
                setItemPos(item, item.posX, item.posY + dropRowCount);
                tweenItemPos(item, item.posX, item.posY, dropRowCount);
            }
        }

        dropRowCountMax = Math.max(dropRowCount, dropRowCountMax);
    }

    return dropRowCountMax;

}

// set the position on the board for a gem
function setItemPos(item, posX, posY) {
    item.posX = posX;
    item.posY = posY;
    item.id = calcGemId(posX, posY);
}

// the gem id is used by getGem() to find specific gems in the group
// each position on the board has a unique id
function calcGemId(posX, posY) {
    return posX + posY * BOARD_COLS;
}

// find a gem on the board according to its position on the board
function getItem(posX, posY) {
    return items.iterate("id", calcGemId(posX, posY), Phaser.Group.RETURN_CHILD);
}

// convert world coordinates to board position
function getItemPos(coordinate, padding) {
    return Math.floor((coordinate - padding) / GEM_SIZE_SPACED);
}

/*
###########################
#           END           #
###########################
*/

/*
###########################
#   CHECKING FUNCTIONS    #
###########################
*/

function checkIfItemCanBeAdded(item) {
    if (selectedItems.size === 0) {
        return true;
    }
    if (!checkIfOutOfBoard(item) && checkIfItemsAreTheSame(lastAdded, item) && checkIfItemsAreAdjacent(lastAdded, item)) {
        return true;
    }
    return false;
}

function checkIfOutOfBoard(item) {
    if(item === null) {
        return true;
    }
    var x = getItemPos(item.x, 0);
    var y = getItemPos(item.y, PADDING_TOP);
    
    return x < 0 || x >= BOARD_COLS || y < 0 || y >= BOARD_ROWS;
}

function checkIfItemsAreAdjacent(item1, item2) {
    var cursorItem1PosX = getItemPos(item1.x, 0);
    var cursorItem1PosY = getItemPos(item1.y, PADDING_TOP);
    var cursorItem2PosX = getItemPos(item2.x, 0);
    var cursorItem2PosY = getItemPos(item2.y, PADDING_TOP);
    // Up Or Down
    if (cursorItem1PosX === cursorItem2PosX && cursorItem1PosY >= cursorItem2PosY - 1 && cursorItem1PosY <= cursorItem2PosY + 1) {
        return true;
    }
    // Left Or Right
    if (cursorItem1PosY === cursorItem2PosY && cursorItem1PosX >= cursorItem2PosX - 1 && cursorItem1PosX <= cursorItem2PosX + 1) {
        return true;
    }
    // Diagonals
    if (cursorItem1PosY >= cursorItem2PosY - 1 && cursorItem1PosY <= cursorItem2PosY + 1 && cursorItem1PosX >= cursorItem2PosX - 1 && cursorItem1PosX <= cursorItem2PosX + 1) {
        return true;
    }
    return false;
}

function checkIfItemsAreTheSame(item1, item2) {
    return item1.cellType == item2.cellType;
}

/*
###########################
#           END           #
###########################
*/

/*
###########################
#   CALLBACK FUNCTIONS    #
###########################
*/

function clickItem(pointer, x, y) {
    
    // If at least one item is clicked
    if (selectedItems.size > 0 && pointer.isDown) {
        
        var cursorItemPosX = getItemPos(x, 0);
        var cursorItemPosY = getItemPos(y, PADDING_TOP);
        
        var item = getItem(cursorItemPosX, cursorItemPosY);
        if (checkIfItemCanBeAdded(item)) {
            animateItem(item);
            selectedItems.add(item);
            lastAdded = item;
        }
        
    }
}

function selectItem(item) {
    if (allowInput)
    {
        selectedItems.add(item);
        lastAdded = item;
    }
}

function releaseItem() {
    if (selectedItems.size >= MATCH_MIN) {
        allowInput = false;
        for (var item of selectedItems.values()) {
            item.kill();
            setItemPos(item, -1, -1);
        }
        var dropGemDuration = dropItems();
        // delay board refilling until all existing gems have dropped down
        game.time.events.add(dropGemDuration * 100, refillBoard);
    } else {
        for (var item of selectedItems.values()) {
            removeBall(item); 
        }
    }
    selectedItems = new Set();
}

// when the board has finished refilling, re-enable player input
function boardRefilled() {
    allowInput = true;
}

/*
###########################
#           END           #
###########################
*/

/*
###########################
#   ANIMATION FUNCTIONS   #
###########################
*/

function animateItem(item) {
    addBall(item);
}

function tweenItemPos(item, newPosX, newPosY, durationMultiplier) {
    if (durationMultiplier === null || typeof durationMultiplier === 'undefined')
    {
        durationMultiplier = 1;
    }

    return game.add.tween(item).to({x: newPosX  * GEM_SIZE_SPACED, y: newPosY * GEM_SIZE_SPACED + PADDING_TOP}, 100 * durationMultiplier, Phaser.Easing.Linear.None, true);

}
    
function addBall(item) {
    if (item.key.indexOf("-ball") === -1) {
        item.loadTexture(item.key + "-ball");
    }
}
    
function removeBall(item) {
    if (item.key.indexOf("-ball") !== -1) {
        var texture = item.key.substring(0, item.key.length - 5);
        item.loadTexture(texture);
    }
}

/*
###########################
#           END           #
###########################
*/

/*
######################
#   DRAW FUNCTIONS   #
######################
*/

// fill the screen with as many items as possible
function spawnBoard() {

    items = game.add.group();

    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            var texture = sprites[game.rnd.integerInRange(0, sprites.length - 1)];
            var item = items.create(i * GEM_SIZE_SPACED, (j * GEM_SIZE_SPACED) + PADDING_TOP, texture);
            item.name = 'item' + i.toString() + 'x' + j.toString();
            item.inputEnabled = true;
            item.cellType = texture;
            item.events.onInputDown.add(selectItem, this);
            item.events.onInputUp.add(releaseItem, this);
            setItemPos(item, i, j); // each gem has a position on the board
        }
    }
}

// look for any empty spots on the board and spawn new gems in their place that fall down from above
function refillBoard() {
    var maxItemsMissingFromCol = 0;

    for (var i = 0; i < BOARD_COLS; i++)
    {
        var itemsMissingFromCol = 0;

        for (var j = BOARD_ROWS - 1; j >= 0; j--)
        {
            var item = getItem(i, j);

            if (item === null)
            {
                itemsMissingFromCol++;
                item = items.getFirstDead();
                item.reset(i * GEM_SIZE_SPACED, -itemsMissingFromCol * GEM_SIZE_SPACED);
                var texture = sprites[game.rnd.integerInRange(0, sprites.length - 1)];
                item.loadTexture(texture);
                item.cellType = texture;
                setItemPos(item, i, j);
                tweenItemPos(item, item.posX, item.posY, itemsMissingFromCol * 2);
            }
        }

        maxItemsMissingFromCol = Math.max(maxItemsMissingFromCol, itemsMissingFromCol);
    }

    game.time.events.add(maxItemsMissingFromCol * 2 * 100, boardRefilled);
}


/*
######################
#         END        #
######################
*/