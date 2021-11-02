<template>
    <div class="pa-3">
        <h2>Select New Object</h2>
        <v-container>
            <v-row>
                <v-col class="col-12">
                    <v-card>
                        <v-card-title>Add Layer Group</v-card-title>
                        <v-card-text>레이어 묶음을 위한 레이어 그룹을 추가합니다</v-card-text>
                        <v-card-actions>
                            <v-btn text to="/addlayergroup">
                                Go
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col class="col-12">
                    <v-card>
                        <v-card-title>Add Layer</v-card-title>
                        <v-card-text>식별결과를 포함한 레이어를 추가합니다. <br>*레이어 묶음이 있어야 추가가 가능합니다</v-card-text>
                        <v-card-actions>
                            <v-btn text to="/addlayer">
                                Go
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
