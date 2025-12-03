import { ReactElement } from "react";

import styles from './meals-grid.module.scss';
import { DBMeal } from "../../types/meal.ts";
import MealItem from "./meal-item.tsx";

const MealsGrid = ({ meals }: { meals: DBMeal[] }): ReactElement => {
    return (
        <ul className={styles.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
};

export default MealsGrid;