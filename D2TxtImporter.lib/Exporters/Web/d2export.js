var Uniques = {};
var AllUniques = {};

var Runewords = {};
var AllRunewords = {};

var CubeRecipes = {};
var AllCubeRecipes = {};

var Sets = {};
var AllSets = {};

function GetUniqueItemDiv(el) {
    var $item = $("<div>");
    $item.addClass("item");

    // Name
    var $spanName = $("<span>");
    $spanName.text(el.Name);
    $spanName.addClass("unique-text");
    $item.append($spanName);
    $item.append($("<br>"));

    // Type
    var $spanType = $("<span>");
    $spanType.text(el.Type);
    $spanType.addClass("unique-text");
    $item.append($spanType);
    $item.append($("<br>"));

    // Damage Armor
    var $divDamage = $("<div>");
    switch (el.Equipment.EquipmentType) {
        case 0: // Armor
            $divDamage.append($("<span>").text("Armor: "));
            $spanArmor = $("<span>");
            $spanArmor.text(el.Equipment.ArmorString);
            if (el.DamageArmorEnhanced) {
                $spanArmor.addClass("enhanced");
            }
            $divDamage.append($spanArmor);
            $divDamage.append($("<br>"));
            break;
        case 1: // Weapon
            el.Equipment.DamageTypes.forEach(wep => {
                $spanDamageString = $("<span>");
                $spanDamageNumbers = $("<span>");
                switch (wep.Type) {
                    case 0: // OneHanded
                        $spanDamageString.text("One-Hand Damage: ");
                        $spanDamageNumbers.text(wep.DamageString);
                        if (el.DamageArmorEnhanced) {
                            $spanDamageNumbers.addClass("enhanced");
                        }
                        break;
                    case 1: // TwoHanded
                        $spanDamageString.text("Two-Hand Damage: ");
                        $spanDamageNumbers.text(wep.DamageString);
                        if (el.DamageArmorEnhanced) {
                            $spanDamageNumbers.addClass("enhanced");
                        }
                        break;
                    case 2: // Thrown
                        $spanDamageString.text("Thrown Damage: ");
                        $spanDamageNumbers.text(wep.DamageString);
                        if (el.DamageArmorEnhanced) {
                            $spanDamageNumbers.addClass("enhanced");
                        }
                        break;
                    case 3: // Normal
                        $spanDamageString.text("Damage: ");
                        $spanDamageNumbers.text(wep.DamageString);
                        if (el.DamageArmorEnhanced) {
                            $spanDamageNumbers.addClass("enhanced");
                        }
                        break;
                }
                $divDamage.append($spanDamageString);
                $divDamage.append($spanDamageNumbers);
                $divDamage.append($("<br>"));
            });
            break;
        case 2: // Jewelery
            break;
    }
    $item.append($divDamage);

    // Required Level
    if (el.RequiredLevel > 0) {
        var $req = $("<span>");
        $req.addClass("requirement");
        $req.text("Required Level: " + el.RequiredLevel);
        $item.append($req);
        $item.append($("<br>"));
    }

    // Required Strength
    if (el.Equipment.RequiredStrength > 0) {
        var $req = $("<span>");
        $req.addClass("requirement");
        $req.text("Required Strength: " + el.Equipment.RequiredStrength);
        $item.append($req);
        $item.append($("<br>"));
    }

    // Required Dexterity
    if (el.Equipment.RequiredDexterity > 0) {
        var $req = $("<span>");
        $req.addClass("requirement");
        $req.text("Required Dexterity: " + el.Equipment.RequiredDexterity);
        $item.append($req);
        $item.append($("<br>"));
    }

    // Required Class
    if (el.Equipment.RequiredClass !== "") {
        var $req = $("<span>");
        $req.addClass("requirement");
        $req.text(el.Equipment.RequiredClass + " Only");
        $item.append($req);
        $item.append($("<br>"));
    }

    // Durability
    if (el.Equipment.Durability != 0) {
        var $req = $("<span>");
        $req.text("Durability: " + el.Equipment.Durability);
        $item.append($req);
        $item.append($("<br>"));
    }

    // Add armor damage (smite damage, kick damage)
    if (el.Equipment.EquipmentType == 0) // Armor type
    {
        if (el.Equipment.DamageString) {
            $item.append($("<span>").text(el.Equipment.DamageStringPrefix + ": " + el.Equipment.DamageString));
            $item.append($("<br>"));
        }
    }

    // Add properties
    el.Properties.forEach(prop => {
        $propSpan = $("<span>");
        $propSpan.addClass("enhanced");
        $propSpan.text(prop.PropertyString);

        $item.append($propSpan);
        $item.append($("<br>"));
    });

    return $item;
}

function RenderUniques() {
    ClearTable();

    Uniques.forEach(el => {
        var $item = GetUniqueItemDiv(el);

        var $tr = $("<tr>");
        var $td = $("<td>");

        $td.append($item);
        $tr.append($td);
        $("#tbody").append($tr);
    });
}

function RenderRunewords() {
    ClearTable();

    Runewords.forEach(el => {
        var $item = $("<div>");
        $item.addClass("item");

        // Name
        var $spanName = $("<span>");
        $spanName.text(el.Name);
        $spanName.addClass("unique-text");
        $item.append($spanName);
        $item.append($("<br>"));

        // Runes
        $divRunes = $("<div>");
        $divRunes.addClass("runes");
        el.Runes.forEach(rune => {
            var $spanRune = $("<span>").text(rune.Name);
            $divRunes.append($spanRune);
        });
        $item.append($divRunes);

        // Types
        $divTypes = $("<div>");
        $divTypes.addClass("runeword-types");
        el.Types.forEach(type => {
            var $spanType = $("<span>").text(type.Name);
            $divTypes.append($spanType);
        });
        $item.append($divTypes);

        // Required Level
        if (el.RequiredLevel > 0) {
            var $req = $("<span>");
            $req.addClass("requirement");
            $req.text("Required Level: " + el.RequiredLevel);
            $item.append($req);
            $item.append($("<br>"));
        }

        // Add properties
        el.Properties.forEach(prop => {
            $propSpan = $("<span>");
            $propSpan.addClass("enhanced");
            $propSpan.text(prop.PropertyString);

            $item.append($propSpan);
            $item.append($("<br>"));
        });

        var $tr = $("<tr>");
        var $td = $("<td>");

        $td.append($item);
        $tr.append($td);
        $("#tbody").append($tr);
    });
}

function RenderCubeRecipes() {
    ClearTable();

    CubeRecipes.forEach(el => {
        var $item = $("<div>");
        $item.addClass("item");

        // Name
        var $spanName = $("<span>");
        $spanName.text(el.Output);
        $spanName.addClass("unique-text");
        $item.append($spanName);
        $item.append($("<br>"));

        // Description
        $recipeSpan = $("<span>");
        $recipeSpan.text(el.CubeRecipeDescription);
        $item.append($recipeSpan);
        $item.append($("<br>"));

        var $tr = $("<tr>");
        var $td = $("<td>");

        $td.append($item);
        $tr.append($td);
        $("#tbody").append($tr);
    });
}

function RenderSets() {
    ClearTable();

    for (var i = 0; i < Sets.length; i++) {
        var set = Sets[i];

        var $item = $("<div>");
        $item.addClass("item");

        // Name
        var $spanName = $("<span>");
        $spanName.text(set.Name);
        $spanName.addClass("set-text");
        $item.append($spanName);
        $item.append($("<br>"));

        // Partial Properties
        for (var j = 0; j < set.PartialProperties.length; j++) {
            var prop = set.PartialProperties[j];

            $propSpan = $("<span>");
            $propSpan.addClass("set-text");
            $propSpan.text(prop.PropertyString + " (" + Math.floor(prop.Index / 2 + 2) + " Items)");

            $item.append($propSpan);
            $item.append($("<br>"));
        }

        // Full Properties
        for (var j = 0; j < set.FullProperties.length; j++) {
            var prop = set.FullProperties[j];

            $propSpan = $("<span>");
            $propSpan.addClass("set-text");
            $propSpan.text(prop.PropertyString + " (Full Set)");

            $item.append($propSpan);
            $item.append($("<br>"));
        }

        $item.append($("<br>"));

        // Set Items
        for (var j = 0; j < set.SetItems.length; j++) {
            var el = set.SetItems[j];

            var uniqueItemDiv = GetUniqueItemDiv(el);
            $item.append(uniqueItemDiv.children());
            for (var k = 0; k < el.SetPropertiesString.length; k++) {
                var propString = el.SetPropertiesString[k];

                var propSpan = $("<span>");
                propSpan.addClass("set-text");
                propSpan.text(propString);
                $item.append(propSpan);
                $item.append($("<br>"));
            }

            $item.append($("<br>"));
        }

        var $tr = $("<tr>");
        var $td = $("<td>");

        $td.append($item);
        $tr.append($td);
        $("#tbody").append($tr);
    }
}

function ClearTable() {
    $("#tbody").html("");
}

var UniqueSearchItems = {};
var RuneWordsSearchItems = {};

function GetUniqueSearch() {
    var types = [];
    AllUniques.forEach(el => {
        if (!types.includes(el.Equipment.Type.Name)) {
            types.push(el.Equipment.Type.Name);
        }
    });
    types.sort();
    types.unshift("Any");

    UniqueSearchItems = { "types": types };
}

function GetRunewordsSearch() {
    var types = [];
    AllRunewords.forEach(el => {
        el.Types.forEach(type => {
            if (!types.includes(type.Name)) {
                types.push(type.Name);
            }
        });
    });
    types.sort();
    types.unshift("Any");

    RuneWordsSearchItems = { "types": types };
}

function HideSearchBars() {
    $("#search-runeword").css("display", "none");
    $("#search-unique").css("display", "none");
    $("#search-cuberecipes").css("display", "none");
    $("#search-sets").css("display", "none");
}

function GenerateSearchBarUniques() {
    HideSearchBars();
    var searchBar = $("#search-unique");
    searchBar.css("display", "flex");

    var typeDropdown = $("#search-unique-type");
    UniqueSearchItems.types.forEach(type => {
        var typeOption = $("<option>");
        typeOption.text(type);
        typeOption.val(type);
        typeDropdown.append(typeOption);
    });
}

function GenerateSearchBarRunewords() {
    HideSearchBars();
    var searchBar = $("#search-runeword");
    searchBar.css("display", "flex");

    var typeDropdown = $("#search-runeword-type");
    RuneWordsSearchItems.types.forEach(type => {
        var typeOption = $("<option>");
        typeOption.text(type);
        typeOption.val(type);
        typeDropdown.append(typeOption);
    });
}

function GenerateSearchBarCubeRecipes() {
    HideSearchBars();
}

function GenerateSearchBarSets() {
    HideSearchBars();
    var searchBar = $("#search-sets");
    searchBar.css("display", "flex");
}

function GetUniques() {
    var json = "<UNIQUES_JSON>";
    Uniques = JSON.parse(json);
    AllUniques = JSON.parse(json);

    GetUniqueSearch();
}

function GetRunewords() {
    var json = "<RUNEWORDS_JSON>";
    Runewords = JSON.parse(json);
    AllRunewords = JSON.parse(json);

    GetRunewordsSearch();
}

function GetCubeRecipes() {
    var json = "<CUBE_RECIPES_JSON>";
    CubeRecipes = JSON.parse(json);
    AllCubeRecipes = JSON.parse(json);
}

function GetSets() {
    var json = "<SETS_JSON>";
    Sets = JSON.parse(json);
    AllSets = JSON.parse(json);
}

GetUniques();
GetRunewords();
GetCubeRecipes();
GetSets();

function Search() {
    var text = $("#searchField")[0].value;
    var activeField = $(".nav-link.active")[0].id;

    var change = false;

    if (activeField === "nav-uniques") {
        var searchedUniques = [];
        var typeSearch = $("#search-unique-type").val();
        AllUniques.forEach(el => {
            if (typeSearch.toLowerCase() === "any" || el.Equipment.Type.Name === typeSearch) {
                if (text.length > 1) {
                    if (el.Name.toLowerCase().includes(text.toLowerCase())) {
                        if (!searchedUniques.some(e => e.Name === el.Name)) {
                            searchedUniques.push(el);
                        }
                    } else if (el.Type.toLowerCase().includes(text.toLowerCase())) {
                        if (!searchedUniques.some(e => e.Name === el.Name)) {
                            searchedUniques.push(el);
                        }
                    }

                    el.Properties.forEach(prop => {
                        if (prop.PropertyString.toLowerCase().includes(text.toLowerCase())) {
                            if (!searchedUniques.some(e => e.Name === el.Name)) {
                                searchedUniques.push(el);
                            }
                        }
                    });
                } else {
                    if (!searchedUniques.some(e => e.Name === el.Name)) {
                        searchedUniques.push(el);
                    }
                }
            }
        });

        if (!CompareItems(Uniques, searchedUniques)) {
            Uniques = searchedUniques;
            change = true;
        }
    } else if (activeField === "nav-runewords") {
        var serachedRunewords = [];
        change = true;
        var typeSearch = $("#search-runeword-type").val();
        AllRunewords.forEach(el => {
            if (typeSearch.toLowerCase() === "any" || el.Types.some(e => e.Name === typeSearch)) {
                if (text.length > 1) {
                    if (el.Name.toLowerCase().includes(text.toLowerCase())) {
                        if (!serachedRunewords.some(e => e.Name === el.Name)) {
                            serachedRunewords.push(el);
                        }
                    }

                    el.Types.forEach(type => {
                        if (type.Name.toLowerCase().includes(text.toLowerCase())) {
                            if (!serachedRunewords.some(e => e.Name === el.Name)) {
                                serachedRunewords.push(el);
                            }
                        }
                    });

                    el.Properties.forEach(prop => {
                        if (prop.PropertyString.toLowerCase().includes(text.toLowerCase())) {
                            if (!serachedRunewords.some(e => e.Name === el.Name)) {
                                serachedRunewords.push(el);
                            }
                        }
                    });
                } else {
                    if (!serachedRunewords.some(e => e.Name === el.Name)) {
                        serachedRunewords.push(el);
                    }
                }
            }
        });

        if (!CompareItems(Runewords, serachedRunewords)) {
            Runewords = serachedRunewords;
            change = true;
        }
    } else if (activeField === "nav-cuberecipes") {
        change = true;
        CubeRecipes = [];
        AllCubeRecipes.forEach(el => {
            if (el.CubeRecipeDescription.toLowerCase().includes(text.toLowerCase())) {
                CubeRecipes.push(el);
            }
        });
    }

    if (change) {
        RenderActive();
    }
}

function CompareItems(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i].Name !== arr2[i].Name)
            return false;
    }
    return true;
}

function RenderActive() {
    var activeField = $(".nav-link.active")[0].id;

    if (activeField === "nav-uniques") {
        RenderUniques();
    } else if (activeField === "nav-runewords") {
        RenderRunewords();
    } else if (activeField === "nav-cuberecipes") {
        RenderCubeRecipes();
    } else if (activeField === "nav-sets") {
        RenderSets();
    }

}

function UpdateOnSearchChange() {
    $(".search-input-change").on('change paste input', function () {
        Search();
    });
}

$('document').ready(function () {
    GenerateSearchBarUniques();
    RenderActive();

    $(".nav .nav-link").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    $("#nav-uniques").click(function () {
        $("#searchField")[0].value = "";
        GenerateSearchBarUniques();
        RenderActive();
    });

    $("#nav-runewords").click(function () {
        $("#searchField")[0].value = "";
        GenerateSearchBarRunewords();
        RenderActive();
    });

    $("#nav-cuberecipes").click(function () {
        $("#searchField")[0].value = "";
        GenerateSearchBarCubeRecipes();
        RenderActive();
    });

    $("#nav-sets").click(function () {
        $("#searchField")[0].value = "";
        GenerateSearchBarSets();
        RenderActive();
    });

    UpdateOnSearchChange();
});