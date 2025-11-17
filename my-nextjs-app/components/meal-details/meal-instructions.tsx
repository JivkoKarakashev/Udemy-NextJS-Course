import { ReactElement } from "react";

import styles from './meal-instructions.module.scss';

const MealInstructions = ({ instructions }: { instructions: string }): ReactElement => {
    const arr = instructions.split('\n').map(el => el.trim()).filter(el => el !== '');
    const arrLength = arr.length;
    // console.log(arr);
    const descList: ReactElement[] = [];
    for (let i = 0; i < arrLength; i += 2) {
        descList.push(
            <dl key={i} className={styles.row}>
                <dt>{arr[i]}</dt>
                <dd>{arr[i + 1]}</dd>
            </dl>
        );
    }
    // console.log(descList);
    return (
        <>
            {descList}
        </>
    );
};


export default MealInstructions;
