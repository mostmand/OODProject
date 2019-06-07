import React, { Component } from "react";
import { ITag } from "./ITag";
import { Input, Dropdown, SearchProps, SearchResultData, Search, Segment, Popup, List, Label, Icon } from "semantic-ui-react";

interface IProps {
    allCategories: ITag[];
    initialSelectedCategories: string[] | undefined;
    onChange: ((selectedCategoryIds: string[]) => void) | undefined;
}

export class CategoryInput extends Component<IProps, {}> {
    search(value: string): ITag[] {
        var results: ITag[] = [];
        this.props.allCategories.forEach(tag => {
            if (tag.name.indexOf(value) !== -1) {
                results.push(tag);
            }
        });

        return results;
    }

    render() {
        return (
            <div>
                <Dropdown
                    options={this.props.allCategories.map(result => {
                        return {
                            text: result.name,
                            value: result.tagId
                        }
                    })}

                    fluid
                    multiple
                    search
                    selection
                    defaultValue={this.props.initialSelectedCategories}
                    onChange={(event, data) => {
                        if (this.props.onChange) {
                            this.props.onChange(data.value as string[]);
                        }
                    }}
                >
                </Dropdown>
            </div>
        )
    }
}