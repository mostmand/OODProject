import React, { Component, ReactNode } from "react";
import { ICategory } from "./ICategory";
import { CategoryAccordion } from "./CategoryAccordion";
import { Accordion, Segment, AccordionTitleProps } from "semantic-ui-react";
import { ITag } from "./ITag";

interface IProps {
    categories: ICategory[];
    onAddClick?: (tag: ITag) => void;
}

export class CategoriesAccordion extends Component<IProps, {}>{
    render() {
        const items: ReactNode[] = [];
        if (this.props.categories) {
            this.props.categories.forEach(category => {
                items.push(
                    <CategoryAccordion onAddClick={this.props.onAddClick} category={category} />
                );
            });
        }

        return (
            <Accordion styled>
                {items}
            </Accordion>
        );
    }
}