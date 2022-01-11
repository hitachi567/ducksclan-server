
export interface BaseEntityInteraface {
    created_at: Date;
    updated_at: Date;
}

export interface SerialEntityInteraface extends BaseEntityInteraface {
    id: number;
}
