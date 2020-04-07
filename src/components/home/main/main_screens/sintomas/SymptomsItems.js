import React from "react";
import Form, {ButtonItem, GroupItem, SimpleItem} from "devextreme-react/form";
import {inject, observer} from "mobx-react";

function SymptomsItems(props) {

    const {SymptomsStore} = props;

    const covid_symptoms = SymptomsStore.covid_symptoms_a;

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(covid_symptoms)
    };

    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <Form
                    formData={covid_symptoms}
                    showColonAfterLabel={true}
                    showValidationSummary={true}
                    validationGroup="symptoms"
                >
                    <GroupItem caption={'Escoja los sintomas que presenta'} colCount={2}>
                        <GroupItem colCount={3}>
                            {Object.keys(covid_symptoms).map(items => {
                                return (
                                    <SimpleItem key={items} dataField={items} editorType="dxCheckBox"/>
                                )
                            })}
                        </GroupItem>
                    </GroupItem>
                </Form>
            </form>
        </div>
    )
}

export default inject('SymptomsStore')(observer(SymptomsItems))
