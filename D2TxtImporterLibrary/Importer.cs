﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D2TxtImporterLibrary
{
    public class Importer
    {
        private string _diabloPath;
        private string _excelPath;
        private string _tablePath;

        public Importer(string diabloPath)
        {
            _diabloPath = diabloPath.Trim('/', '\\');
            _excelPath = (diabloPath + @"/Data/Global/Excel").Trim('/', '\\');
            _tablePath = (diabloPath + @"/Data/local/lng/eng").Trim('/', '\\');

            Model.Table.Import(_tablePath);
            Model.ItemStatCost.Import(_excelPath);
            Model.EffectProperty.Import(_excelPath);
            Model.ItemType.Import(_excelPath);
            Model.Armor.Import(_excelPath);
            Model.Weapon.Import(_excelPath);
            Model.Skill.Import(_excelPath);
            Model.CharStat.Import(_excelPath);
            Model.MonStat.Import(_excelPath);

            var miscItems = Model.Misc.Import(_excelPath);
            var uniques = Model.Unique.Import(_excelPath);
            var runewords = Model.Runeword.Import(_excelPath);
            var cubeRecipes = Model.CubeRecipe.Import(_excelPath);

            TxtExporter.Uniques(_diabloPath + "/uniques.txt", uniques);
            TxtExporter.Runewords(_diabloPath + "/runewords.txt", runewords);
            TxtExporter.CubeRecipes(_diabloPath + "/cube_recipes.txt", cubeRecipes);
        }

        public static List<string> ReadCsvFile(string path)
        {
            return File.ReadAllLines(path).Skip(1).ToList();
        }

        // TODO
        public static List<string> ReadTablesFile(string path)
        {
            var result = new List<string>();

            using (var bs = new FileStream(path, FileMode.Open))
            {
                while (bs.CanRead)
                {
                    var b = bs.ReadByte();

                }

            }

            return result;
        }
    }
}
