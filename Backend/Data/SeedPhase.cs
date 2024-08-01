namespace Backend.Data
{
    public class SeedPhase
    {
        private string[] words;

        public SeedPhase()
        {
            words = new string[5];
            GenerateSeedPhase();
        }

        private void GenerateSeedPhase(){
            string[] sampleWords = new string[] { "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "xigua", "yellowfruit", "zucchini" };

            Random random = new Random();

            for (int i = 0; i < words.Length; i++)
            {
            words[i] = sampleWords[random.Next(sampleWords.Length)];
            }
        }

        public string GetWords()
        {
            return string.Join(" ", words);
        }
    }
}