import { ReactElement } from "react";

import styles from './meals-grid.module.scss';
import { Meal } from "../../types/meal";
import MealItem from "./meal-item";

const MealsGrid = ({ meals }: { meals: Meal[] }): ReactElement => {
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