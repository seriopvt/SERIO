-- Insert Injera
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Injera', 'Advanced', '15 minutes', '2 minutes per injera', '8-10 injera',
    ARRAY['Teff flour', 'Water', 'Salt', 'Starter culture'],
    $$
    {
      "name": "Injera (Ethiopian Flatbread)",
      "description": "Slightly sour, spongy fermented flatbread made from teff flour, essential for Ethiopian dining",
      "difficulty": "Advanced",
      "prep_time": "15 minutes",
      "fermentation_time": "2-3 days",
      "cook_time": "2 minutes per injera",
      "servings": "8-10 injera",
      "ingredients": [
        { "item": "Teff flour", "quantity": "2 cups", "preparation": "Fine grind" },
        { "item": "Water", "quantity": "3 cups", "preparation": "Divided, at room temperature" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "Fine" },
        { "item": "Starter culture", "quantity": "1/4 cup", "preparation": "From previous batch or fermentation liquid", "optional": true }
      ],
      "instructions": [
        { "step": 1, "action": "Mix teff flour with 2 cups water in a large bowl until smooth", "details": "Cover and let ferment at room temperature for 2-3 days, until bubbly and sour" },
        { "step": 2, "action": "After fermentation, stir in salt and remaining water until batter reaches crepe-like consistency", "details": "Batter should be thin enough to spread easily" },
        { "step": 3, "action": "Heat a non-stick skillet or mitad (Ethiopian clay griddle) over medium-high heat", "details": "Do not oil the pan" },
        { "step": 4, "action": "Pour about 1/2 cup batter into the center and quickly swirl to cover the pan in a thin layer", "details": "Unlike crepes, only cook on one side" },
        { "step": 5, "action": "Cover and cook for 1-2 minutes until holes form and surface is dry", "details": "Edges will lift slightly when done" },
        { "step": 6, "action": "Remove and cool on a rack, never stack until completely cool", "details": "Store wrapped in clean towel" }
      ],
      "tips": "Injera should have a spongy texture with small eyes (holes) throughout. The bottom should be smooth with no browning."
    }
    $$
);

-- Insert Doro Wat
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Doro Wat', 'Intermediate', '30 minutes', '1 hour 30 minutes', '4-6',
    ARRAY['Chicken', 'Lemon juice', 'Salt', 'Onions', 'Niter kibbeh', 'Berbere spice', 'Tomato paste', 'Garlic', 'Ginger', 'Water', 'Hard-boiled eggs'],
    $$
    {
      "name": "Doro Wat (Spicy Chicken Stew)",
      "description": "Ethiopia's national dish, a richly spiced chicken stew with hard-boiled eggs",
      "difficulty": "Intermediate",
      "prep_time": "30 minutes",
      "cook_time": "1 hour 30 minutes",
      "servings": "4-6",
      "ingredients": [
        { "item": "Chicken", "quantity": "3 lbs", "preparation": "Cut into 12 pieces, skin removed, scored" },
        { "item": "Lemon juice", "quantity": "1/4 cup", "preparation": "Freshly squeezed" },
        { "item": "Salt", "quantity": "2 tablespoons", "preparation": "Divided" },
        { "item": "Onions", "quantity": "3 large", "preparation": "Finely chopped" },
        { "item": "Niter kibbeh", "quantity": "1/2 cup", "preparation": "Spiced clarified butter" },
        { "item": "Berbere spice", "quantity": "1/2 cup", "preparation": "Ethiopian spice blend" },
        { "item": "Tomato paste", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "2 tablespoons", "preparation": "Fresh, grated" },
        { "item": "Water", "quantity": "2 cups", "preparation": "Warm" },
        { "item": "Hard-boiled eggs", "quantity": "4-6", "preparation": "Peeled, scored" }
      ],
      "instructions": [
        { "step": 1, "action": "Marinate chicken with lemon juice and 1 tablespoon salt for 30 minutes", "details": "Rinse and pat dry before using" },
        { "step": 2, "action": "Cook onions in a dry heavy pot over medium heat until softened and reduced", "details": "Stir frequently, about 20 minutes" },
        { "step": 3, "action": "Add niter kibbeh and continue cooking until onions are golden brown", "details": "About 10-15 minutes" },
        { "step": 4, "action": "Stir in berbere and cook for 5 minutes until fragrant", "details": "Be careful not to burn the spices" },
        { "step": 5, "action": "Add tomato paste, garlic, and ginger, cook for 3 minutes", "details": "Stir constantly" },
        { "step": 6, "action": "Add water and remaining salt, bring to simmer", "details": "Cook uncovered for 20 minutes" },
        { "step": 7, "action": "Add chicken pieces, cover and simmer for 45 minutes", "details": "Stir occasionally" },
        { "step": 8, "action": "Add hard-boiled eggs, cook for additional 15 minutes", "details": "Eggs will absorb the red sauce" }
      ],
      "tips": "The stew should be thick and oily. Traditionally served with fresh ayib cheese on the side."
    }
    $$
);

-- Insert Misir Wat
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Misir Wat', 'Easy', '10 minutes', '40 minutes', '4',
    ARRAY['Red lentils', 'Onion', 'Niter kibbeh', 'Berbere spice', 'Garlic', 'Ginger', 'Tomato', 'Water', 'Salt'],
    $$
    {
      "name": "Misir Wat (Red Lentil Stew)",
      "description": "Spicy red lentil stew, a staple of Ethiopian vegetarian dishes",
      "difficulty": "Easy",
      "prep_time": "10 minutes",
      "cook_time": "40 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Red lentils", "quantity": "2 cups", "preparation": "Washed and drained" },
        { "item": "Onion", "quantity": "1 medium", "preparation": "Finely diced" },
        { "item": "Niter kibbeh", "quantity": "1/4 cup", "preparation": "Or vegetable oil for vegan version" },
        { "item": "Berbere spice", "quantity": "3 tablespoons", "preparation": "" },
        { "item": "Garlic", "quantity": "3 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "1 tablespoon", "preparation": "Fresh, grated" },
        { "item": "Tomato", "quantity": "1 large", "preparation": "Diced" },
        { "item": "Water", "quantity": "4 cups", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "To taste" }
      ],
      "instructions": [
        { "step": 1, "action": "Sauté onions in niter kibbeh until soft and translucent", "details": "About 5-7 minutes" },
        { "step": 2, "action": "Add berbere and cook for 2 minutes until fragrant", "details": "Stir to prevent burning" },
        { "step": 3, "action": "Add garlic and ginger, cook for 1 minute", "details": "" },
        { "step": 4, "action": "Add lentils, water, and tomato, bring to boil", "details": "Skim any foam that rises" },
        { "step": 5, "action": "Reduce heat, cover and simmer for 30-35 minutes", "details": "Stir occasionally, add water if too thick" },
        { "step": 6, "action": "Add salt to taste and mash slightly", "details": "Should be thick and creamy" }
      ],
      "tips": "For a richer flavor, let the stew rest for 30 minutes before serving. Can be made oil-free by water-sautéing."
    }
    $$
);

-- Insert Siga Wat
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Siga Wat', 'Intermediate', '30 minutes', '2 hours', '4-6',
    ARRAY['Beef chuck', 'Onions', 'Niter kibbeh', 'Berbere spice', 'Garlic', 'Ginger', 'Tomato paste', 'Beef broth', 'Salt', 'Hard-boiled eggs'],
    $$
    {
      "name": "Siga Wat (Spicy Beef Stew)",
      "description": "Rich, dark beef stew simmered with berbere and spiced butter until tender",
      "difficulty": "Intermediate",
      "prep_time": "30 minutes",
      "cook_time": "2 hours",
      "servings": "4-6",
      "ingredients": [
        { "item": "Beef chuck", "quantity": "2 lbs", "preparation": "Cut into 1.5-inch cubes" },
        { "item": "Onions", "quantity": "3 large", "preparation": "Finely chopped" },
        { "item": "Niter kibbeh", "quantity": "1/2 cup", "preparation": "Spiced clarified butter" },
        { "item": "Berbere spice", "quantity": "1/3 cup", "preparation": "" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "2 tablespoons", "preparation": "Fresh, grated" },
        { "item": "Tomato paste", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Beef broth", "quantity": "2 cups", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "To taste" },
        { "item": "Hard-boiled eggs", "quantity": "4", "preparation": "Peeled (optional)" }
      ],
      "instructions": [
        { "step": 1, "action": "Cook onions in a dry heavy pot over medium heat until softened and reduced", "details": "Stir frequently, about 20 minutes, until onions release their moisture" },
        { "step": 2, "action": "Add niter kibbeh and continue cooking until onions are deep golden brown", "details": "About 10-15 minutes" },
        { "step": 3, "action": "Stir in berbere and cook for 5 minutes until fragrant", "details": "Be careful not to burn the spices" },
        { "step": 4, "action": "Add garlic, ginger, and tomato paste, cook for 3 minutes", "details": "Stir constantly" },
        { "step": 5, "action": "Add beef cubes and brown on all sides", "details": "About 5-7 minutes" },
        { "step": 6, "action": "Add beef broth and bring to simmer", "details": "Scrape bottom to release any browned bits" },
        { "step": 7, "action": "Cover and simmer on low heat for 1.5-2 hours until beef is tender", "details": "Stir occasionally, add water if needed" },
        { "step": 8, "action": "Add salt to taste and hard-boiled eggs in last 15 minutes if using", "details": "Sauce should be thick and dark" }
      ],
      "tips": "Traditional Siga Wat should be dark reddish-brown and very rich. The longer it simmers, the better the flavor."
    }
    $$
);

-- Insert Kik Alicha
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Kik Alicha', 'Easy', '10 minutes', '45 minutes', '4',
    ARRAY['Yellow split peas', 'Onion', 'Niter kibbeh', 'Garlic', 'Ginger', 'Turmeric', 'Water', 'Salt'],
    $$
    {
      "name": "Kik Alicha (Mild Split Pea Stew)",
      "description": "Mild, comforting yellow split pea stew flavored with turmeric and ginger",
      "difficulty": "Easy",
      "prep_time": "10 minutes",
      "cook_time": "45 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Yellow split peas", "quantity": "2 cups", "preparation": "Washed and drained" },
        { "item": "Onion", "quantity": "1 medium", "preparation": "Finely diced" },
        { "item": "Niter kibbeh", "quantity": "1/4 cup", "preparation": "Or vegetable oil" },
        { "item": "Garlic", "quantity": "3 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "1 tablespoon", "preparation": "Fresh, grated" },
        { "item": "Turmeric", "quantity": "1 teaspoon", "preparation": "Ground" },
        { "item": "Water", "quantity": "5 cups", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "To taste" }
      ],
      "instructions": [
        { "step": 1, "action": "Sauté onions in niter kibbeh until soft and translucent", "details": "About 5-7 minutes" },
        { "step": 2, "action": "Add garlic and ginger, cook for 2 minutes", "details": "" },
        { "step": 3, "action": "Add turmeric and stir for 1 minute", "details": "" },
        { "step": 4, "action": "Add split peas and water, bring to boil", "details": "Skim any foam that rises" },
        { "step": 5, "action": "Reduce heat, cover and simmer for 40-45 minutes", "details": "Stir occasionally, until peas are soft and broken down" },
        { "step": 6, "action": "Add salt to taste and mash slightly", "details": "Should be thick and creamy, like a thick soup" }
      ],
      "tips": "Kik Alicha is often served alongside spicy dishes to balance the heat. Can be thinned with water for a soup-like consistency."
    }
    $$
);

-- Insert Shiro Wat
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Shiro Wat', 'Easy', '10 minutes', '30 minutes', '4',
    ARRAY['Shiro powder', 'Onion', 'Garlic', 'Niter kibbeh', 'Tomato', 'Berbere spice', 'Water', 'Salt'],
    $$
    {
      "name": "Shiro Wat (Chickpea Stew)",
      "description": "Smooth, savory stew made from ground chickpeas and broad beans",
      "difficulty": "Easy",
      "prep_time": "10 minutes",
      "cook_time": "30 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Shiro powder", "quantity": "1 cup", "preparation": "Ground chickpea and broad bean flour with spices" },
        { "item": "Onion", "quantity": "1 large", "preparation": "Finely minced" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Niter kibbeh", "quantity": "1/4 cup", "preparation": "Or oil" },
        { "item": "Tomato", "quantity": "1", "preparation": "Diced" },
        { "item": "Berbere spice", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Water", "quantity": "4 cups", "preparation": "Warm" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "To taste" }
      ],
      "instructions": [
        { "step": 1, "action": "Sauté onions in niter kibbeh until very soft", "details": "About 10 minutes" },
        { "step": 2, "action": "Add garlic and cook for 2 minutes", "details": "" },
        { "step": 3, "action": "Add berbere and tomato, cook for 3 minutes", "details": "" },
        { "step": 4, "action": "Whisk in shiro powder gradually to prevent lumps", "details": "Add water slowly while whisking" },
        { "step": 5, "action": "Bring to simmer, stirring constantly", "details": "Will thicken as it cooks" },
        { "step": 6, "action": "Reduce heat and simmer for 20 minutes", "details": "Stir frequently to prevent sticking" },
        { "step": 7, "action": "Add salt to taste", "details": "Should be smooth and thick" }
      ],
      "tips": "Traditional fasting version uses oil instead of niter kibbeh. Can be thinned with more water to desired consistency."
    }
    $$
);

-- Insert Gomen
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Gomen', 'Easy', '15 minutes', '30 minutes', '4',
    ARRAY['Collard greens', 'Onion', 'Garlic', 'Ginger', 'Niter kibbeh', 'Jalapeño', 'Salt', 'Water'],
    $$
    {
      "name": "Gomen (Collard Greens)",
      "description": "Slow-cooked collard greens with aromatic spices",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "30 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Collard greens", "quantity": "2 bunches", "preparation": "Washed, stems removed, finely chopped" },
        { "item": "Onion", "quantity": "1 medium", "preparation": "Diced" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "1 tablespoon", "preparation": "Fresh, grated" },
        { "item": "Niter kibbeh", "quantity": "3 tablespoons", "preparation": "Or olive oil" },
        { "item": "Jalapeño", "quantity": "1", "preparation": "Whole with slit" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Water", "quantity": "1/4 cup", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Sauté onion in niter kibbeh until soft", "details": "About 5 minutes" },
        { "step": 2, "action": "Add garlic and ginger, cook for 2 minutes", "details": "" },
        { "step": 3, "action": "Add collard greens in batches, stirring until wilted", "details": "About 5 minutes" },
        { "step": 4, "action": "Add water, salt, and whole jalapeño", "details": "Cover and simmer for 20-25 minutes" },
        { "step": 5, "action": "Remove jalapeño before serving", "details": "Greens should be very tender" }
      ],
      "tips": "Traditional version cooks until greens are very soft. Can be made ahead as flavors improve overnight."
    }
    $$
);

-- Insert Fasolia
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Fasolia', 'Easy', '15 minutes', '20 minutes', '4',
    ARRAY['Green beans', 'Carrots', 'Onion', 'Garlic', 'Niter kibbeh', 'Berbere spice', 'Salt', 'Water'],
    $$
    {
      "name": "Fasolia (Ethiopian Green Beans & Carrots)",
      "description": "Sautéed green beans and carrots with onions and aromatic spices",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "20 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Green beans", "quantity": "1 lb", "preparation": "Trimmed, cut into 2-inch pieces" },
        { "item": "Carrots", "quantity": "3 medium", "preparation": "Cut into matchsticks" },
        { "item": "Onion", "quantity": "1 medium", "preparation": "Sliced thin" },
        { "item": "Garlic", "quantity": "3 cloves", "preparation": "Minced" },
        { "item": "Niter kibbeh", "quantity": "3 tablespoons", "preparation": "Or vegetable oil" },
        { "item": "Berbere spice", "quantity": "1 teaspoon", "preparation": "Optional" },
        { "item": "Salt", "quantity": "1/2 teaspoon", "preparation": "To taste" },
        { "item": "Water", "quantity": "1/4 cup", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Blanch green beans in boiling salted water for 3 minutes", "details": "Shock in ice water to maintain color" },
        { "step": 2, "action": "Heat niter kibbeh in a large pan over medium heat", "details": "" },
        { "step": 3, "action": "Sauté onions until soft and translucent", "details": "About 5 minutes" },
        { "step": 4, "action": "Add garlic and cook for 1 minute", "details": "" },
        { "step": 5, "action": "Add carrots and cook for 3 minutes", "details": "" },
        { "step": 6, "action": "Add blanched green beans, berbere (if using), salt, and water", "details": "Stir to combine" },
        { "step": 7, "action": "Cover and simmer for 5-7 minutes until vegetables are tender-crisp", "details": "" }
      ],
      "tips": "Vegetables should retain some crunch. Can be made without berbere for a milder version."
    }
    $$
);

-- Insert Ayibe
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Ayibe', 'Intermediate', '5 minutes', '10 minutes', '1 cup',
    ARRAY['Whole milk', 'Buttermilk', 'White vinegar', 'Salt'],
    $$
    {
      "name": "Ayibe (Ethiopian Fresh Cheese)",
      "description": "Mild, crumbly fresh cheese similar to cottage cheese, often served to cool spicy dishes",
      "difficulty": "Intermediate",
      "prep_time": "5 minutes",
      "cook_time": "10 minutes",
      "draining_time": "1-2 hours",
      "yield": "1 cup",
      "servings": "4",
      "ingredients": [
        { "item": "Whole milk", "quantity": "4 cups", "preparation": "Not ultra-pasteurized" },
        { "item": "Buttermilk", "quantity": "1/2 cup", "preparation": "Cultured" },
        { "item": "White vinegar", "quantity": "2 tablespoons", "preparation": "As needed" },
        { "item": "Salt", "quantity": "1/2 teaspoon", "preparation": "To taste" }
      ],
      "instructions": [
        { "step": 1, "action": "Heat milk in heavy pot to 185°F (85°C)", "details": "Stir occasionally to prevent scorching" },
        { "step": 2, "action": "Add buttermilk and stir gently", "details": "Curds should begin to form" },
        { "step": 3, "action": "If curds don't form, add vinegar 1 tablespoon at a time", "details": "Until whey separates clearly" },
        { "step": 4, "action": "Remove from heat and let rest for 10 minutes", "details": "" },
        { "step": 5, "action": "Line colander with cheesecloth and pour mixture", "details": "" },
        { "step": 6, "action": "Gather cheesecloth and hang to drain for 1-2 hours", "details": "Longer for drier cheese" },
        { "step": 7, "action": "Mix in salt to taste", "details": "Store refrigerated" }
      ],
      "tips": "Ayib is traditionally served as a cooling accompaniment to spicy wats. Use within 3-4 days."
    }
    $$
);

-- Insert Tibs
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Tibs', 'Easy', '15 minutes', '15 minutes', '4',
    ARRAY['Beef sirloin', 'Niter kibbeh', 'Onion', 'Bell peppers', 'Jalapeño', 'Garlic', 'Rosemary', 'Salt', 'Black pepper'],
    $$
    {
      "name": "Tibs (Sautéed Meat)",
      "description": "Quick-fried meat with onions, peppers, and aromatic spices - a popular Ethiopian dish",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "15 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Beef sirloin", "quantity": "1.5 lbs", "preparation": "Cut into 1-inch cubes" },
        { "item": "Niter kibbeh", "quantity": "3 tablespoons", "preparation": "" },
        { "item": "Onion", "quantity": "1 large", "preparation": "Sliced thin" },
        { "item": "Bell peppers", "quantity": "2", "preparation": "Mixed colors, sliced" },
        { "item": "Jalapeño", "quantity": "2", "preparation": "Sliced (seeded for less heat)" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Rosemary", "quantity": "2 sprigs", "preparation": "Fresh, chopped" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Black pepper", "quantity": "1/2 teaspoon", "preparation": "Freshly ground" }
      ],
      "instructions": [
        { "step": 1, "action": "Heat niter kibbeh in a large skillet over high heat", "details": "Until very hot but not smoking" },
        { "step": 2, "action": "Add beef in a single layer, don't overcrowd", "details": "Work in batches if needed" },
        { "step": 3, "action": "Sear beef until browned on all sides", "details": "About 3-4 minutes total, remove and set aside" },
        { "step": 4, "action": "In same pan, sauté onions and peppers until crisp-tender", "details": "About 3 minutes" },
        { "step": 5, "action": "Add garlic and rosemary, cook for 1 minute", "details": "" },
        { "step": 6, "action": "Return beef to pan, add salt and pepper", "details": "Toss to combine and heat through" }
      ],
      "tips": "Tibs should be served immediately while sizzling. For special occasions, add a splash of tej (Ethiopian honey wine) or whiskey."
    }
    $$
);

-- Insert Shekla Tibs
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Shekla Tibs', 'Intermediate', '20 minutes', '25 minutes', '4',
    ARRAY['Beef tenderloin', 'Niter kibbeh', 'Onion', 'Bell peppers', 'Tomato', 'Jalapeño', 'Garlic', 'Ginger', 'Rosemary', 'Berbere spice', 'Salt'],
    $$
    {
      "name": "Shekla Tibs (Clay Pot Sautéed Meat)",
      "description": "Sizzling meat dish served in a traditional clay pot with vegetables and aromatic spices",
      "difficulty": "Intermediate",
      "prep_time": "20 minutes",
      "cook_time": "25 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Beef tenderloin", "quantity": "1.5 lbs", "preparation": "Cut into 1-inch cubes" },
        { "item": "Niter kibbeh", "quantity": "1/4 cup", "preparation": "" },
        { "item": "Onion", "quantity": "1 large", "preparation": "Sliced thin" },
        { "item": "Bell peppers", "quantity": "2", "preparation": "Mixed colors, sliced" },
        { "item": "Tomato", "quantity": "1 large", "preparation": "Diced" },
        { "item": "Jalapeño", "quantity": "2", "preparation": "Whole with slits" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "1 tablespoon", "preparation": "Fresh, grated" },
        { "item": "Rosemary", "quantity": "2 sprigs", "preparation": "Fresh" },
        { "item": "Berbere spice", "quantity": "1 tablespoon", "preparation": "Optional" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Heat a clay pot (shekla) or cast iron skillet over medium-high heat", "details": "If using clay pot, heat gradually to prevent cracking" },
        { "step": 2, "action": "Add niter kibbeh and let it melt", "details": "" },
        { "step": 3, "action": "Add onions and sauté until translucent", "details": "About 3 minutes" },
        { "step": 4, "action": "Add garlic, ginger, and berbere if using, cook for 1 minute", "details": "" },
        { "step": 5, "action": "Add beef cubes and sear quickly", "details": "About 2-3 minutes, meat should be medium-rare" },
        { "step": 6, "action": "Add bell peppers, tomatoes, jalapeños, and rosemary", "details": "Stir to combine" },
        { "step": 7, "action": "Season with salt and serve immediately in the hot pot", "details": "The dish should be sizzling at the table" }
      ],
      "tips": "Shekla Tibs is meant to be a showpiece - the clay pot keeps the dish hot throughout the meal. Traditionally eaten with injera directly from the pot."
    }
    $$
);

-- Insert Yebeg Tibs
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Yebeg Tibs', 'Easy', '15 minutes', '20 minutes', '4',
    ARRAY['Lamb leg or shoulder', 'Niter kibbeh', 'Onion', 'Garlic', 'Ginger', 'Rosemary', 'Berbere spice', 'Salt', 'Black pepper', 'Bell peppers'],
    $$
    {
      "name": "Yebeg Tibs (Lamb Tibs)",
      "description": "Sautéed lamb with onions, rosemary, and traditional Ethiopian spices",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "20 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Lamb leg or shoulder", "quantity": "1.5 lbs", "preparation": "Cut into 1-inch cubes" },
        { "item": "Niter kibbeh", "quantity": "1/4 cup", "preparation": "" },
        { "item": "Onion", "quantity": "1 large", "preparation": "Sliced thin" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "1 tablespoon", "preparation": "Fresh, grated" },
        { "item": "Rosemary", "quantity": "3 sprigs", "preparation": "Fresh, chopped" },
        { "item": "Berbere spice", "quantity": "2 teaspoons", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Black pepper", "quantity": "1/2 teaspoon", "preparation": "" },
        { "item": "Bell peppers", "quantity": "2", "preparation": "Sliced (optional)" }
      ],
      "instructions": [
        { "step": 1, "action": "Heat niter kibbeh in a large skillet or pan over medium-high heat", "details": "" },
        { "step": 2, "action": "Add lamb cubes in a single layer and brown on all sides", "details": "About 5-7 minutes total, remove and set aside" },
        { "step": 3, "action": "In the same pan, sauté onions until soft and golden", "details": "About 5 minutes" },
        { "step": 4, "action": "Add garlic, ginger, and berbere, cook for 2 minutes", "details": "Stir constantly" },
        { "step": 5, "action": "Return lamb to pan, add rosemary, salt, and pepper", "details": "If using bell peppers, add them now" },
        { "step": 6, "action": "Cook for 3-5 minutes until lamb is cooked to desired doneness", "details": "Lamb should be tender but not overcooked" }
      ],
      "tips": "Lamb tibs are often served medium-rare to medium. For extra flavor, add a splash of lemon juice at the end."
    }
    $$
);

-- Insert Kitfo
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Kitfo', 'Advanced', '20 minutes', '5 minutes', '4',
    ARRAY['Beef tenderloin', 'Niter kibbeh', 'Mitmita spice', 'Cardamom', 'Salt', 'Ayibe cheese'],
    $$
    {
      "name": "Kitfo (Ethiopian Steak Tartare)",
      "description": "Finely minced raw beef marinated in mitmita and niter kibbeh - a ceremonial dish",
      "difficulty": "Advanced",
      "prep_time": "20 minutes",
      "cook_time": "5 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Beef tenderloin", "quantity": "1.5 lbs", "preparation": "Very fresh, chilled, fat trimmed" },
        { "item": "Niter kibbeh", "quantity": "1/2 cup", "preparation": "Melted" },
        { "item": "Mitmita spice", "quantity": "2 tablespoons", "preparation": "Ethiopian hot spice blend" },
        { "item": "Cardamom", "quantity": "1 teaspoon", "preparation": "Ground" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Ayibe cheese", "quantity": "1 cup", "preparation": "For serving" }
      ],
      "instructions": [
        { "step": 1, "action": "Place chilled beef in freezer for 30 minutes to firm up", "details": "Makes mincing easier" },
        { "step": 2, "action": "Using a sharp knife, finely mince the beef", "details": "Can also use a meat grinder with coarse plate" },
        { "step": 3, "action": "Heat niter kibbeh until hot but not boiling", "details": "About 150°F (65°C)" },
        { "step": 4, "action": "Pour hot butter over minced beef", "details": "This lightly cooks the exterior" },
        { "step": 5, "action": "Add mitmita, cardamom, and salt", "details": "Mix thoroughly" },
        { "step": 6, "action": "For medium-rare (lebleb), return to heat for 1-2 minutes", "details": "Stir constantly until desired doneness" },
        { "step": 7, "action": "Serve immediately with ayibe cheese and injera", "details": "Traditional accompaniment is cooked collard greens" }
      ],
      "tips": "Food safety is crucial - use only the freshest, highest-quality beef from a trusted source. Traditional kitfo is raw, but can be cooked to medium-rare (lebleb)."
    }
    $$
);

-- Insert Dulet
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Dulet', 'Advanced', '30 minutes', '20 minutes', '4',
    ARRAY['Beef tripe', 'Beef liver', 'Lean beef', 'Niter kibbeh', 'Onion', 'Berbere spice', 'Mitmita spice', 'Garlic', 'Ginger', 'Cardamom', 'Salt'],
    $$
    {
      "name": "Dulet (Spicy Minced Organ Meat)",
      "description": "Spicy mixture of minced tripe, liver, and lean beef with traditional spices",
      "difficulty": "Advanced",
      "prep_time": "30 minutes",
      "cook_time": "20 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Beef tripe", "quantity": "1/2 lb", "preparation": "Cleaned, boiled until tender, minced" },
        { "item": "Beef liver", "quantity": "1/2 lb", "preparation": "Cleaned, minced" },
        { "item": "Lean beef", "quantity": "1/2 lb", "preparation": "Minced" },
        { "item": "Niter kibbeh", "quantity": "1/3 cup", "preparation": "" },
        { "item": "Onion", "quantity": "1 large", "preparation": "Finely chopped" },
        { "item": "Berbere spice", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Mitmita spice", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Garlic", "quantity": "4 cloves", "preparation": "Minced" },
        { "item": "Ginger", "quantity": "1 tablespoon", "preparation": "Fresh, grated" },
        { "item": "Cardamom", "quantity": "1/2 teaspoon", "preparation": "Ground" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Boil tripe in salted water until very tender", "details": "About 1-2 hours, then mince finely" },
        { "step": 2, "action": "Heat niter kibbeh in a large pan over medium heat", "details": "" },
        { "step": 3, "action": "Sauté onions until soft and golden", "details": "About 5-7 minutes" },
        { "step": 4, "action": "Add garlic, ginger, and cook for 2 minutes", "details": "" },
        { "step": 5, "action": "Add berbere, mitmita, and cardamom, cook for 1 minute", "details": "Stir constantly" },
        { "step": 6, "action": "Add minced tripe and cook for 5 minutes", "details": "" },
        { "step": 7, "action": "Add minced beef and cook for 3-4 minutes", "details": "" },
        { "step": 8, "action": "Add liver in the last 2 minutes of cooking", "details": "Liver should remain slightly pink" },
        { "step": 9, "action": "Season with salt and serve hot", "details": "Traditionally served with injera" }
      ],
      "tips": "Dulet is prized for its complex textures. The key is not overcooking the liver - it should be just cooked through."
    }
    $$
);

-- Insert Gored Gored
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Gored Gored', 'Advanced', '15 minutes', '0 minutes', '4',
    ARRAY['Beef tenderloin', 'Niter kibbeh', 'Mitmita spice', 'Awaze sauce', 'Salt'],
    $$
    {
      "name": "Gored Gored (Spiced Raw Beef)",
      "description": "Cubes of raw beef marinated in mitmita and niter kibbeh, similar to kitfo but in larger pieces",
      "difficulty": "Advanced",
      "prep_time": "15 minutes",
      "cook_time": "0 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Beef tenderloin", "quantity": "1.5 lbs", "preparation": "Very fresh, cut into 1/2-inch cubes" },
        { "item": "Niter kibbeh", "quantity": "1/3 cup", "preparation": "Melted, warm" },
        { "item": "Mitmita spice", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Awaze sauce", "quantity": "2 tablespoons", "preparation": "Spiced berbere paste" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Place beef cubes in a bowl", "details": "Beef should be very fresh and chilled" },
        { "step": 2, "action": "Add warm niter kibbeh and toss to coat", "details": "The warmth slightly warms the beef" },
        { "step": 3, "action": "Add mitmita, awaze, and salt", "details": "Mix thoroughly to coat all pieces" },
        { "step": 4, "action": "Let marinate for 5-10 minutes", "details": "Allows flavors to penetrate" },
        { "step": 5, "action": "Serve immediately with injera", "details": "Often accompanied by fresh cheese and greens" }
      ],
      "tips": "Gored Gored is traditionally shared between two people. Use only the highest quality beef and consume immediately after preparation."
    }
    $$
);

-- Insert Beyainatu
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Beyainatu', 'Intermediate', '45 minutes', '1 hour', '4',
    ARRAY['Injera', 'Misir Wat', 'Kik Alicha', 'Shiro Wat', 'Gomen', 'Fasolia', 'Azifa', 'Timatim Fitfit'],
    $$
    {
      "name": "Beyainatu (Vegetarian Combination Platter)",
      "description": "'A bit of everything' - a colorful platter of various vegetarian dishes served during fasting periods",
      "difficulty": "Intermediate",
      "prep_time": "45 minutes",
      "cook_time": "1 hour",
      "servings": "4",
      "ingredients": [
        { "item": "Injera", "quantity": "4-5 pieces", "preparation": "Large, for serving" },
        { "item": "Misir Wat", "quantity": "1 cup", "preparation": "Spicy red lentils" },
        { "item": "Kik Alicha", "quantity": "1 cup", "preparation": "Mild split peas" },
        { "item": "Shiro Wat", "quantity": "1 cup", "preparation": "Chickpea stew" },
        { "item": "Gomen", "quantity": "1 cup", "preparation": "Collard greens" },
        { "item": "Fasolia", "quantity": "1 cup", "preparation": "Green beans and carrots" },
        { "item": "Azifa", "quantity": "1/2 cup", "preparation": "Lentil salad" },
        { "item": "Timatim Fitfit", "quantity": "1/2 cup", "preparation": "Tomato salad" }
      ],
      "instructions": [
        { "step": 1, "action": "Prepare all individual dishes according to their recipes", "details": "Each component should be ready before assembly" },
        { "step": 2, "action": "Line a large round platter with a piece of injera", "details": "The injera should cover the entire surface" },
        { "step": 3, "action": "Arrange the dishes in small piles around the platter", "details": "Place contrasting colors next to each other" },
        { "step": 4, "action": "Place extra injera on the side or rolled on the platter", "details": "Traditional presentation is artistic and colorful" },
        { "step": 5, "action": "Serve immediately with additional injera on the side", "details": "Everyone eats from the shared platter" }
      ],
      "tips": "Beyainatu is the perfect way to experience multiple Ethiopian vegetarian dishes at once. Arrange the dishes with contrasting colors for visual appeal."
    }
    $$
);

-- Insert Fosoliya
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Fosoliya', 'Easy', '15 minutes', '20 minutes', '4',
    ARRAY['Green beans', 'Carrots', 'Potatoes', 'Onion', 'Vegetable oil', 'Garlic', 'Turmeric', 'Salt', 'Water'],
    $$
    {
      "name": "Fosoliya (Fasting Green Bean Stew)",
      "description": "Green bean stew made without animal products, perfect for fasting days",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "20 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Green beans", "quantity": "1 lb", "preparation": "Trimmed, cut into 2-inch pieces" },
        { "item": "Carrots", "quantity": "2 medium", "preparation": "Diced" },
        { "item": "Potatoes", "quantity": "2 medium", "preparation": "Peeled, cubed" },
        { "item": "Onion", "quantity": "1 large", "preparation": "Diced" },
        { "item": "Vegetable oil", "quantity": "3 tablespoons", "preparation": "" },
        { "item": "Garlic", "quantity": "3 cloves", "preparation": "Minced" },
        { "item": "Turmeric", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Water", "quantity": "1 cup", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Heat oil in a large pot over medium heat", "details": "" },
        { "step": 2, "action": "Sauté onions until soft and translucent", "details": "About 5 minutes" },
        { "step": 3, "action": "Add garlic and cook for 1 minute", "details": "" },
        { "step": 4, "action": "Add turmeric and stir for 30 seconds", "details": "" },
        { "step": 5, "action": "Add potatoes and carrots, cook for 3 minutes", "details": "" },
        { "step": 6, "action": "Add green beans, water, and salt", "details": "Bring to simmer" },
        { "step": 7, "action": "Cover and cook for 15-20 minutes until vegetables are tender", "details": "Stir occasionally" }
      ],
      "tips": "Fosoliya is a common fasting dish. The vegetables should be tender but not mushy."
    }
    $$
);

-- Insert Chechebsa
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Chechebsa', 'Intermediate', '20 minutes', '25 minutes', '4',
    ARRAY['Flour', 'Water', 'Salt', 'Niter kibbeh', 'Berbere spice', 'Onion', 'Garlic', 'Honey', 'Yogurt'],
    $$
    {
      "name": "Chechebsa (Kita Firfir)",
      "description": "Shredded flatbread fried in berbere sauce and served with honey or yogurt",
      "difficulty": "Intermediate",
      "prep_time": "20 minutes",
      "cook_time": "25 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Flour", "quantity": "2 cups", "preparation": "All-purpose" },
        { "item": "Water", "quantity": "1 cup", "preparation": "Warm" },
        { "item": "Salt", "quantity": "1/2 teaspoon", "preparation": "" },
        { "item": "Niter kibbeh", "quantity": "1/2 cup", "preparation": "Or vegetable oil for fasting" },
        { "item": "Berbere spice", "quantity": "3 tablespoons", "preparation": "" },
        { "item": "Onion", "quantity": "1 medium", "preparation": "Finely chopped" },
        { "item": "Garlic", "quantity": "3 cloves", "preparation": "Minced" },
        { "item": "Honey", "quantity": "1/4 cup", "preparation": "For serving" },
        { "item": "Yogurt", "quantity": "1 cup", "preparation": "For serving (optional)" }
      ],
      "instructions": [
        { "step": 1, "action": "Mix flour, water, and salt to form a soft dough", "details": "Knead for 5 minutes until smooth" },
        { "step": 2, "action": "Divide dough into 4 balls and roll into thin circles", "details": "About 1/8-inch thick" },
        { "step": 3, "action": "Cook each circle on a dry griddle until lightly browned", "details": "About 2 minutes per side" },
        { "step": 4, "action": "Tear the cooked breads into small pieces", "details": "Set aside" },
        { "step": 5, "action": "Heat niter kibbeh in a large pan", "details": "" },
        { "step": 6, "action": "Sauté onions until soft", "details": "About 3 minutes" },
        { "step": 7, "action": "Add garlic and berbere, cook for 2 minutes", "details": "" },
        { "step": 8, "action": "Add torn bread pieces and stir to coat with sauce", "details": "Cook until heated through" },
        { "step": 9, "action": "Serve hot with honey and yogurt on the side", "details": "Mix according to preference" }
      ],
      "tips": "Chechebsa is a popular breakfast dish. The combination of spicy bread with sweet honey is traditional."
    }
    $$
);

-- Insert Enkulal Firfir
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Enkulal Firfir', 'Easy', '10 minutes', '10 minutes', '2',
    ARRAY['Eggs', 'Niter kibbeh', 'Onion', 'Tomato', 'Jalapeño', 'Berbere spice', 'Salt', 'Injera'],
    $$
    {
      "name": "Enkulal Firfir (Spicy Scrambled Eggs)",
      "description": "Scrambled eggs cooked with berbere, peppers, and onions - a popular breakfast dish",
      "difficulty": "Easy",
      "prep_time": "10 minutes",
      "cook_time": "10 minutes",
      "servings": "2",
      "ingredients": [
        { "item": "Eggs", "quantity": "6 large", "preparation": "Beaten" },
        { "item": "Niter kibbeh", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Onion", "quantity": "1 small", "preparation": "Finely diced" },
        { "item": "Tomato", "quantity": "1 medium", "preparation": "Diced" },
        { "item": "Jalapeño", "quantity": "1", "preparation": "Finely chopped" },
        { "item": "Berbere spice", "quantity": "1 tablespoon", "preparation": "" },
        { "item": "Salt", "quantity": "1/2 teaspoon", "preparation": "" },
        { "item": "Injera", "quantity": "2 pieces", "preparation": "Torn into pieces" }
      ],
      "instructions": [
        { "step": 1, "action": "Heat niter kibbeh in a skillet over medium heat", "details": "" },
        { "step": 2, "action": "Sauté onions until soft", "details": "About 3 minutes" },
        { "step": 3, "action": "Add jalapeño and cook for 1 minute", "details": "" },
        { "step": 4, "action": "Add berbere and stir for 30 seconds", "details": "" },
        { "step": 5, "action": "Add tomatoes and cook for 2 minutes", "details": "" },
        { "step": 6, "action": "Pour in beaten eggs and scramble until just set", "details": "Stir gently, about 3-4 minutes" },
        { "step": 7, "action": "Add torn injera pieces and fold in", "details": "Cook for 1 minute to warm through" },
        { "step": 8, "action": "Season with salt and serve immediately", "details": "" }
      ],
      "tips": "Enkulal Firfir is often eaten for breakfast or as a quick meal. The injera soaks up the eggs and spices beautifully."
    }
    $$
);

-- Insert Azifa
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Azifa', 'Easy', '15 minutes', '0 minutes', '4',
    ARRAY['Green lentils', 'Tomatoes', 'Red onion', 'Jalapeño', 'Lemon juice', 'Olive oil', 'Salt', 'Black pepper'],
    $$
    {
      "name": "Azifa (Ethiopian Lentil Salad)",
      "description": "Refreshing green lentil salad with tomatoes, onions, and green chiles - naturally vegan and gluten-free",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "0 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Green lentils", "quantity": "1 cup", "preparation": "Cooked and cooled" },
        { "item": "Tomatoes", "quantity": "2 medium", "preparation": "Diced" },
        { "item": "Red onion", "quantity": "1 small", "preparation": "Finely diced" },
        { "item": "Jalapeño", "quantity": "1", "preparation": "Seeded, minced" },
        { "item": "Lemon juice", "quantity": "3 tablespoons", "preparation": "Freshly squeezed" },
        { "item": "Olive oil", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Black pepper", "quantity": "1/2 teaspoon", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Combine cooked lentils, tomatoes, onion, and jalapeño in a bowl", "details": "Lentils should be tender but not mushy" },
        { "step": 2, "action": "Whisk together lemon juice, olive oil, salt, and pepper", "details": "" },
        { "step": 3, "action": "Pour dressing over lentil mixture and toss gently", "details": "" },
        { "step": 4, "action": "Let sit for 10-15 minutes before serving", "details": "Allows flavors to meld" }
      ],
      "tips": "Azifa is perfect as a side dish or light meal. Serve with injera for a complete experience."
    }
    $$
);

-- Insert Genfo
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Genfo', 'Easy', '5 minutes', '15 minutes', '4',
    ARRAY['Barley flour', 'Water', 'Salt', 'Niter kibbeh', 'Berbere spice', 'Honey'],
    $$
    {
      "name": "Genfo (Ethiopian Porridge)",
      "description": "Thick barley or wheat porridge served with niter kibbeh and berbere - traditional breakfast",
      "difficulty": "Easy",
      "prep_time": "5 minutes",
      "cook_time": "15 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Barley flour", "quantity": "2 cups", "preparation": "Roasted" },
        { "item": "Water", "quantity": "4 cups", "preparation": "" },
        { "item": "Salt", "quantity": "1/2 teaspoon", "preparation": "" },
        { "item": "Niter kibbeh", "quantity": "1/2 cup", "preparation": "Melted" },
        { "item": "Berbere spice", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Honey", "quantity": "1/4 cup", "preparation": "For serving" }
      ],
      "instructions": [
        { "step": 1, "action": "Bring water and salt to a boil in a heavy pot", "details": "" },
        { "step": 2, "action": "Gradually whisk in barley flour", "details": "Stir constantly to prevent lumps" },
        { "step": 3, "action": "Reduce heat and cook, stirring vigorously, until thick", "details": "About 10 minutes, mixture should pull away from sides" },
        { "step": 4, "action": "Shape into a mound on a serving platter", "details": "Make a well in the center" },
        { "step": 5, "action": "Fill the well with niter kibbeh and sprinkle berbere around", "details": "Create a decorative pattern" },
        { "step": 6, "action": "Serve with honey on the side", "details": "Traditionally eaten with hands" }
      ],
      "tips": "Genfo is often served to new mothers and during holidays. The well in the center symbolizes abundance."
    }
    $$
);

-- Insert Bula
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Bula', 'Intermediate', '10 minutes', '15 minutes', '4',
    ARRAY['Bula starch', 'Water', 'Milk', 'Sugar', 'Butter'],
    $$
    {
      "name": "Bula (Enset Porridge)",
      "description": "Traditional porridge made from enset (false banana) starch, often served with milk",
      "difficulty": "Intermediate",
      "prep_time": "10 minutes",
      "cook_time": "15 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Bula starch", "quantity": "1 cup", "preparation": "From enset plant" },
        { "item": "Water", "quantity": "4 cups", "preparation": "" },
        { "item": "Milk", "quantity": "1 cup", "preparation": "Warm" },
        { "item": "Sugar", "quantity": "2 tablespoons", "preparation": "To taste" },
        { "item": "Butter", "quantity": "2 tablespoons", "preparation": "Optional" }
      ],
      "instructions": [
        { "step": 1, "action": "Dissolve bula starch in 1 cup cold water", "details": "Stir until smooth" },
        { "step": 2, "action": "Bring remaining 3 cups water to boil", "details": "" },
        { "step": 3, "action": "Slowly pour starch mixture into boiling water", "details": "Whisk constantly" },
        { "step": 4, "action": "Cook until thickened and translucent", "details": "About 5-7 minutes" },
        { "step": 5, "action": "Stir in milk, sugar, and butter if using", "details": "Heat through but do not boil" }
      ],
      "tips": "Bula is a staple in southern Ethiopia. The consistency should be smooth and pudding-like."
    }
    $$
);

-- Insert Himbasha
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Himbasha', 'Intermediate', '20 minutes', '30 minutes', '8',
    ARRAY['All-purpose flour', 'Active dry yeast', 'Sugar', 'Salt', 'Cardamom', 'Raisins', 'Warm milk', 'Butter', 'Egg'],
    $$
    {
      "name": "Himbasha (Ethiopian Celebration Bread)",
      "description": "Sweet, wheel-shaped bread with raisins and cardamom, traditionally served during holidays",
      "difficulty": "Intermediate",
      "prep_time": "20 minutes",
      "rise_time": "1.5 hours",
      "cook_time": "30 minutes",
      "servings": "8",
      "ingredients": [
        { "item": "All-purpose flour", "quantity": "4 cups", "preparation": "" },
        { "item": "Active dry yeast", "quantity": "2 teaspoons", "preparation": "" },
        { "item": "Sugar", "quantity": "1/2 cup", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Cardamom", "quantity": "1 tablespoon", "preparation": "Ground" },
        { "item": "Raisins", "quantity": "1/2 cup", "preparation": "" },
        { "item": "Warm milk", "quantity": "1 cup", "preparation": "" },
        { "item": "Butter", "quantity": "1/2 cup", "preparation": "Melted, divided" },
        { "item": "Egg", "quantity": "1", "preparation": "Beaten (for egg wash)" }
      ],
      "instructions": [
        { "step": 1, "action": "Dissolve yeast and 1 tablespoon sugar in warm milk", "details": "Let sit for 5-10 minutes until foamy" },
        { "step": 2, "action": "Mix flour, remaining sugar, salt, cardamom, and raisins in a large bowl", "details": "" },
        { "step": 3, "action": "Add yeast mixture and 1/4 cup melted butter", "details": "Mix to form a dough" },
        { "step": 4, "action": "Knead for 10 minutes until smooth and elastic", "details": "Add flour if needed" },
        { "step": 5, "action": "Cover and let rise until doubled, about 1 hour", "details": "" },
        { "step": 6, "action": "Punch down and shape into a round loaf", "details": "Decorate with traditional patterns using a knife" },
        { "step": 7, "action": "Place on baking sheet, cover and let rise for 30 minutes", "details": "" },
        { "step": 8, "action": "Brush with egg wash and remaining melted butter", "details": "" },
        { "step": 9, "action": "Bake at 350°F for 25-30 minutes until golden brown", "details": "" }
      ],
      "tips": "The decorative patterns on Himbasha are unique to each baker. Traditional designs often include lines radiating from the center."
    }
    $$
);

-- Insert Fatira
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Fatira', 'Intermediate', '15 minutes', '20 minutes', '4',
    ARRAY['All-purpose flour', 'Salt', 'Sugar', 'Vegetable oil', 'Water', 'Eggs', 'Honey'],
    $$
    {
      "name": "Fatira (Ethiopian Fried Bread)",
      "description": "Thin, flaky fried bread often served with scrambled eggs and honey for breakfast",
      "difficulty": "Intermediate",
      "prep_time": "15 minutes",
      "rest_time": "30 minutes",
      "cook_time": "20 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "All-purpose flour", "quantity": "3 cups", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Sugar", "quantity": "1 tablespoon", "preparation": "" },
        { "item": "Vegetable oil", "quantity": "1/4 cup", "preparation": "Plus more for frying" },
        { "item": "Water", "quantity": "1 cup", "preparation": "Warm" },
        { "item": "Eggs", "quantity": "4", "preparation": "Scrambled (for serving)" },
        { "item": "Honey", "quantity": "1/4 cup", "preparation": "For serving" }
      ],
      "instructions": [
        { "step": 1, "action": "Mix flour, salt, and sugar in a large bowl", "details": "" },
        { "step": 2, "action": "Add oil and warm water, mix to form a soft dough", "details": "" },
        { "step": 3, "action": "Knead for 5-7 minutes until smooth", "details": "" },
        { "step": 4, "action": "Cover and let rest for 30 minutes", "details": "" },
        { "step": 5, "action": "Divide dough into 4 balls, roll each very thin", "details": "Should be almost translucent" },
        { "step": 6, "action": "Heat oil in a large skillet for frying", "details": "About 1/2-inch deep" },
        { "step": 7, "action": "Fry each circle until golden brown on both sides", "details": "About 2-3 minutes per side" },
        { "step": 8, "action": "Drain on paper towels", "details": "" },
        { "step": 9, "action": "Serve warm with scrambled eggs and honey", "details": "Can also be served with berbere sauce" }
      ],
      "tips": "Fatira is similar to Indian puri or Middle Eastern fried bread. The key is rolling it very thin for maximum flakiness."
    }
    $$
);

-- Insert Sambusa
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Sambusa', 'Intermediate', '30 minutes', '30 minutes', '12 pieces',
    ARRAY['Spring roll wrappers', 'Ground beef', 'Red lentils', 'Onion', 'Garlic', 'Berbere spice', 'Cumin', 'Salt', 'Oil'],
    $$
    {
      "name": "Sambusa (Ethiopian Fried Pastries)",
      "description": "Crispy fried pastries filled with spiced lentils or meat - Ethiopia's version of samosa",
      "difficulty": "Intermediate",
      "prep_time": "30 minutes",
      "cook_time": "30 minutes",
      "servings": "12 pieces",
      "ingredients": [
        { "item": "Spring roll wrappers", "quantity": "12 sheets", "preparation": "Or homemade dough" },
        { "item": "Ground beef", "quantity": "1 lb", "preparation": "For meat version" },
        { "item": "Red lentils", "quantity": "1 cup", "preparation": "Cooked, for vegetarian version" },
        { "item": "Onion", "quantity": "1 large", "preparation": "Finely chopped" },
        { "item": "Garlic", "quantity": "3 cloves", "preparation": "Minced" },
        { "item": "Berbere spice", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Cumin", "quantity": "1 teaspoon", "preparation": "Ground" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Oil", "quantity": "2 cups", "preparation": "For frying" }
      ],
      "instructions": [
        { "step": 1, "action": "For filling: Sauté onion until soft", "details": "About 5 minutes" },
        { "step": 2, "action": "Add garlic, berbere, and cumin, cook for 2 minutes", "details": "" },
        { "step": 3, "action": "Add meat or lentils and cook until done", "details": "Season with salt" },
        { "step": 4, "action": "Cut wrappers into strips if using spring roll sheets", "details": "About 3 inches wide" },
        { "step": 5, "action": "Place filling at one end and fold into triangles", "details": "Seal edges with water" },
        { "step": 6, "action": "Heat oil to 350°F (175°C)", "details": "" },
        { "step": 7, "action": "Fry sambusa until golden brown", "details": "About 3-4 minutes, drain on paper towels" }
      ],
      "tips": "Sambusa are popular during Ramadan and holidays. Serve with awaze sauce for dipping."
    }
    $$
);

-- Insert Dabo Kolo
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Dabo Kolo', 'Easy', '15 minutes', '20 minutes', '4 cups',
    ARRAY['All-purpose flour', 'Berbere spice', 'Salt', 'Sugar', 'Baking powder', 'Water', 'Oil'],
    $$
    {
      "name": "Dabo Kolo (Ethiopian Snack)",
      "description": "Small, crunchy fried dough snacks flavored with berbere - popular street food",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "20 minutes",
      "yield": "4 cups",
      "ingredients": [
        { "item": "All-purpose flour", "quantity": "2 cups", "preparation": "" },
        { "item": "Berbere spice", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Sugar", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Baking powder", "quantity": "1/2 teaspoon", "preparation": "" },
        { "item": "Water", "quantity": "3/4 cup", "preparation": "Warm" },
        { "item": "Oil", "quantity": "2 cups", "preparation": "For frying" }
      ],
      "instructions": [
        { "step": 1, "action": "Mix flour, berbere, salt, sugar, and baking powder", "details": "" },
        { "step": 2, "action": "Add water gradually to form a stiff dough", "details": "Knead for 5 minutes" },
        { "step": 3, "action": "Let rest for 10 minutes", "details": "" },
        { "step": 4, "action": "Roll dough into thin ropes and cut into small pieces", "details": "About pea-sized" },
        { "step": 5, "action": "Heat oil to 350°F (175°C)", "details": "" },
        { "step": 6, "action": "Fry in batches until golden and crispy", "details": "About 3-4 minutes" },
        { "step": 7, "action": "Drain on paper towels and cool", "details": "Store in airtight container" }
      ],
      "tips": "Dabo Kolo keeps well for weeks. Adjust berbere amount to taste. Can also be baked for a healthier version."
    }
    $$
);

-- Insert Ethiopian Beet Salad
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Ethiopian Beet Salad', 'Easy', '15 minutes', '30 minutes', '4',
    ARRAY['Beets', 'Potatoes', 'Red onion', 'Jalapeño', 'Lemon juice', 'Olive oil', 'Salt', 'Black pepper'],
    $$
    {
      "name": "Ethiopian Beet & Potato Salad",
      "description": "Marinated beets with potatoes, onions, and spicy dressing",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "30 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Beets", "quantity": "3 medium", "preparation": "Peeled, cubed" },
        { "item": "Potatoes", "quantity": "2 medium", "preparation": "Peeled, cubed" },
        { "item": "Red onion", "quantity": "1 small", "preparation": "Thinly sliced" },
        { "item": "Jalapeño", "quantity": "1", "preparation": "Seeded, minced" },
        { "item": "Lemon juice", "quantity": "3 tablespoons", "preparation": "" },
        { "item": "Olive oil", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" },
        { "item": "Black pepper", "quantity": "1/2 teaspoon", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Boil beets until tender, about 20-25 minutes", "details": "Drain and cool" },
        { "step": 2, "action": "Boil potatoes until tender, about 15 minutes", "details": "Drain and cool" },
        { "step": 3, "action": "Combine cooled vegetables with onion and jalapeño", "details": "" },
        { "step": 4, "action": "Whisk together lemon juice, oil, salt, and pepper", "details": "" },
        { "step": 5, "action": "Pour dressing over vegetables and toss gently", "details": "" },
        { "step": 6, "action": "Refrigerate for at least 1 hour before serving", "details": "Flavors meld as it chills" }
      ],
      "tips": "The vibrant red color makes this salad beautiful. Serve cold as a refreshing side dish."
    }
    $$
);

-- Insert Timatim Fitfit
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Timatim Fitfit', 'Easy', '15 minutes', '0 minutes', '4',
    ARRAY['Tomatoes', 'Red onion', 'Jalapeño', 'Injera', 'Berbere spice', 'Lemon juice', 'Olive oil', 'Salt'],
    $$
    {
      "name": "Timatim Fitfit (Tomato & Injera Salad)",
      "description": "Fresh tomato salad mixed with torn injera and berbere dressing",
      "difficulty": "Easy",
      "prep_time": "15 minutes",
      "cook_time": "0 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Tomatoes", "quantity": "4 medium", "preparation": "Diced" },
        { "item": "Red onion", "quantity": "1 small", "preparation": "Finely diced" },
        { "item": "Jalapeño", "quantity": "1", "preparation": "Minced" },
        { "item": "Injera", "quantity": "2 pieces", "preparation": "Torn into bite-size pieces" },
        { "item": "Berbere spice", "quantity": "1 tablespoon", "preparation": "" },
        { "item": "Lemon juice", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Olive oil", "quantity": "2 tablespoons", "preparation": "" },
        { "item": "Salt", "quantity": "1 teaspoon", "preparation": "" }
      ],
      "instructions": [
        { "step": 1, "action": "Combine tomatoes, onion, and jalapeño in a bowl", "details": "" },
        { "step": 2, "action": "Add berbere, lemon juice, oil, and salt", "details": "Mix well" },
        { "step": 3, "action": "Let sit for 10 minutes to develop flavors", "details": "" },
        { "step": 4, "action": "Add torn injera just before serving", "details": "Toss gently to combine" }
      ],
      "tips": "Add injera at the last moment so it doesn't become too soggy. The salad should have a mix of textures."
    }
    $$
);

-- Insert Ethiopian Coffee Ceremony
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Ethiopian Coffee Ceremony', 'Advanced', '15 minutes', '20 minutes', '4',
    ARRAY['Green coffee beans', 'Water', 'Sugar', 'Popcorn'],
    $$
    {
      "name": "Ethiopian Coffee Ceremony",
      "description": "Traditional coffee preparation ceremony with roasting, grinding, and brewing in a jebena",
      "difficulty": "Advanced",
      "prep_time": "15 minutes",
      "cook_time": "20 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Green coffee beans", "quantity": "1/2 cup", "preparation": "Ethiopian" },
        { "item": "Water", "quantity": "4 cups", "preparation": "" },
        { "item": "Sugar", "quantity": "To taste", "preparation": "" },
        { "item": "Popcorn", "quantity": "1 cup", "preparation": "Roasted (traditional accompaniment)" }
      ],
      "instructions": [
        { "step": 1, "action": "Wash green coffee beans and drain", "details": "" },
        { "step": 2, "action": "Roast beans in a pan over medium heat until dark and fragrant", "details": "Shake constantly, about 5-7 minutes" },
        { "step": 3, "action": "Pass roasted beans around for guests to inhale the smoke", "details": "Traditional part of ceremony" },
        { "step": 4, "action": "Grind beans to a fine powder", "details": "Traditionally using a mortar and pestle" },
        { "step": 5, "action": "Add ground coffee to jebena (clay pot) with water", "details": "" },
        { "step": 6, "action": "Bring to boil, then remove from heat", "details": "Let grounds settle, repeat 3 times" },
        { "step": 7, "action": "Pour into small cups from a height", "details": "To cool slightly and create foam" },
        { "step": 8, "action": "Serve with sugar and roasted popcorn", "details": "Three rounds are traditional" }
      ],
      "tips": "The ceremony can take 1-2 hours and is a social event. The hostess wears traditional clothing and burns incense throughout."
    }
    $$
);

-- Insert Tej
INSERT INTO public."Recipe" (name, difficulty, prep_time, servings, ingredients, recipe_data) VALUES (
    'Tej', 'Advanced', '30 minutes', '1 gallon',
    ARRAY['Honey', 'Water', 'Gesho leaves'],
    $$
    {
      "name": "Tej (Ethiopian Honey Wine)",
      "description": "Traditional honey wine brewed with gesho leaves - sweet and slightly effervescent",
      "difficulty": "Advanced",
      "prep_time": "30 minutes",
      "fermentation_time": "2-4 weeks",
      "yield": "1 gallon",
      "ingredients": [
        { "item": "Honey", "quantity": "3 lbs", "preparation": "Raw, unfiltered" },
        { "item": "Water", "quantity": "1 gallon", "preparation": "Filtered" },
        { "item": "Gesho leaves", "quantity": "1 handful", "preparation": "Dried" }
      ],
      "instructions": [
        { "step": 1, "action": "Dissolve honey in warm water", "details": "Stir until completely dissolved" },
        { "step": 2, "action": "Add gesho leaves to the mixture", "details": "" },
        { "step": 3, "action": "Pour into fermentation vessel with airlock", "details": "Leave headspace for fermentation" },
        { "step": 4, "action": "Ferment at room temperature for 2-4 weeks", "details": "Until bubbling stops and wine clears" },
        { "step": 5, "action": "Remove gesho leaves and siphon into bottles", "details": "Age for additional flavor if desired" }
      ],
      "tips": "Tej is traditionally served in a special flask called a 'berele'. The sweetness varies by fermentation time."
    }
    $$
);

-- Insert Tella
INSERT INTO public."Recipe" (name, difficulty, prep_time, servings, ingredients, recipe_data) VALUES (
    'Tella', 'Advanced', '45 minutes', '1 gallon',
    ARRAY['Barley', 'Teff', 'Gesho leaves', 'Water', 'Yeast'],
    $$
    {
      "name": "Tella (Ethiopian Home-Brewed Beer)",
      "description": "Traditional home-brewed beer made from teff, barley, or sorghum",
      "difficulty": "Advanced",
      "prep_time": "45 minutes",
      "fermentation_time": "5-7 days",
      "yield": "1 gallon",
      "ingredients": [
        { "item": "Barley", "quantity": "2 lbs", "preparation": "Roasted and ground" },
        { "item": "Teff", "quantity": "1 lb", "preparation": "Ground" },
        { "item": "Gesho leaves", "quantity": "1 handful", "preparation": "Dried" },
        { "item": "Water", "quantity": "1.5 gallons", "preparation": "" },
        { "item": "Yeast", "quantity": "1 packet", "preparation": "Brewer's yeast (optional)" }
      ],
      "instructions": [
        { "step": 1, "action": "Roast barley until dark brown, then grind", "details": "" },
        { "step": 2, "action": "Mix ground barley and teff with water", "details": "Bring to boil, then simmer for 30 minutes" },
        { "step": 3, "action": "Cool to room temperature", "details": "" },
        { "step": 4, "action": "Add gesho leaves and yeast if using", "details": "" },
        { "step": 5, "action": "Cover and ferment for 5-7 days", "details": "Strain before serving" }
      ],
      "tips": "Tella is traditionally brewed for holidays and celebrations. The strength varies by fermentation time."
    }
    $$
);

-- Insert Atmet
INSERT INTO public."Recipe" (name, difficulty, prep_time, cook_time, servings, ingredients, recipe_data) VALUES (
    'Atmet', 'Easy', '5 minutes', '15 minutes', '4',
    ARRAY['Oats', 'Barley', 'Water', 'Milk', 'Sugar'],
    $$
    {
      "name": "Atmet (Oat and Barley Drink)",
      "description": "Nutritious warm drink made from oats and barley, often given to new mothers",
      "difficulty": "Easy",
      "prep_time": "5 minutes",
      "cook_time": "15 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Oats", "quantity": "1/2 cup", "preparation": "Ground" },
        { "item": "Barley", "quantity": "1/2 cup", "preparation": "Ground" },
        { "item": "Water", "quantity": "4 cups", "preparation": "" },
        { "item": "Milk", "quantity": "1 cup", "preparation": "Optional" },
        { "item": "Sugar", "quantity": "2 tablespoons", "preparation": "To taste" }
      ],
      "instructions": [
        { "step": 1, "action": "Mix ground oats and barley with 1 cup water", "details": "Stir until smooth" },
        { "step": 2, "action": "Bring remaining water to boil", "details": "" },
        { "step": 3, "action": "Whisk in grain mixture slowly", "details": "Stir constantly" },
        { "step": 4, "action": "Simmer for 10 minutes until thickened", "details": "" },
        { "step": 5, "action": "Add milk and sugar if using", "details": "Heat through and serve warm" }
      ],
      "tips": "Atmet is believed to have healing properties and is often served to those recovering from illness."
    }
    $$
);

-- Insert Spriss
INSERT INTO public."Recipe" (name, difficulty, prep_time, servings, ingredients, recipe_data) VALUES (
    'Spriss', 'Intermediate', '15 minutes', '4',
    ARRAY['Mango', 'Avocado', 'Papaya', 'Orange juice'],
    $$
    {
      "name": "Spriss (Layered Fruit Juice)",
      "description": "Beautiful layered fruit juice made with pure juices - no water, sugar, or ice added",
      "difficulty": "Intermediate",
      "prep_time": "15 minutes",
      "servings": "4",
      "ingredients": [
        { "item": "Mango", "quantity": "2 large", "preparation": "Peeled, pureed" },
        { "item": "Avocado", "quantity": "2 ripe", "preparation": "Pureed with lemon juice" },
        { "item": "Papaya", "quantity": "1 large", "preparation": "Peeled, pureed" },
        { "item": "Orange juice", "quantity": "1 cup", "preparation": "Freshly squeezed" }
      ],
      "instructions": [
        { "step": 1, "action": "Prepare each fruit puree separately", "details": "Each should be smooth and thick" },
        { "step": 2, "action": "Chill all juices well", "details": "Cold juices layer better" },
        { "step": 3, "action": "Pour the heaviest juice first (mango or avocado)", "details": "Pour slowly down the side of the glass" },
        { "step": 4, "action": "Carefully layer next juice using the back of a spoon", "details": "Pour against spoon to prevent mixing" },
        { "step": 5, "action": "Continue layering with remaining juices", "details": "Serve immediately before layers mix" }
      ],
      "tips": "The key to Spriss is using thick, pure fruit juices without any dilution. Serve in clear glasses to show the layers."
    }
    $$
);