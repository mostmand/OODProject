import React, { Component, ReactNode } from "react";
import { ICategory } from "./ICategory";
import { Accordion, AccordionTitleProps, Button, Icon } from "semantic-ui-react";
import { CategoriesAccordion } from "./CategoriesAccordion";
import { ITag } from "./ITag";

interface IProps {
    category: ICategory;
    onAddClick?: (tag: ITag) => void;
}

export class CategoryAccordion extends Component<IProps, {}>{
    render() {
        const category = this.props.category;
        if (!category.subCategories || category.subCategories.length === 0) {
            return (
                <div>
                    <p key={category.categoryId}>
                        {category.name}
                        <Button icon circular onClick={() => {
                        if (this.props.onAddClick) {
                            this.props.onAddClick({
                                name: category.name,
                                tagId: category.categoryId
                            });
                        }
                    }}>
                        <Icon name="plus circle" color="green" size="large"></Icon>
                    </Button>
                    </p>
                </div>
            );
        } else {
            const items: ReactNode[] = [];

            return (
                <Accordion.Accordion
                    panels={[{
                        key: category.categoryId,
                        title: {children: <div>
                            {category.name}
                            <Button icon circular onClick={(event, data) => {
                                if (this.props.onAddClick) {
                                    this.props.onAddClick({
                                        name: category.name,
                                        tagId: category.categoryId
                                    });
                                }
                                event.stopPropagation();
                            }}>
                                <Icon name="plus circle" color="green" size="large"></Icon>
                            </Button>
                        </div>},
                        content: { content: <CategoriesAccordion onAddClick={this.props.onAddClick} categories={category.subCategories}></CategoriesAccordion> }
                    }]}>

                </Accordion.Accordion>
            );
        }
    }
}