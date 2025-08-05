<script>
import http from '../../http';
import { VContainer, VRow, VCol, VSelect, VDivider, VSwitch } from 'vuetify/components';

export default {
    data() {
        return {
            allNotes: [],
            notes: [],
            scaleNames: [],
            currentScale: [],
            scaleChords: [],
            extensiveChords: 'true',
            selectedNote: '',
            selectedScale: '',
        }
    },
    mounted() {
        this.populateDropdowns()
    },
    methods: {
        async populateDropdowns() {
            try {
                const all_notes = await http.get('/all_notes');
                this.allNotes = all_notes.data.notes;
                this.notes = all_notes.data.notes;

                const scaleNames = await http.get('/scale_names');
                this.scaleNames = scaleNames.data.scales;
            } catch (error) {
                return console.log('Error populating dropdowns:', error);
            }
        },
        async getScale() {
            try {
                if (!this.selectedNote) this.selectedNote = 'c';
                if (!this.selectedScale) this.selectedScale = 'chromatic';
                const scaleData = await http.get(encodeURIComponent('scale/' + this.selectedNote + '/' + this.selectedScale));
                this.currentScale = scaleData.data.scale;

                const scaleChords = await http.get(encodeURIComponent('diatonic_chords' + '/' + this.selectedNote + '/' + this.selectedScale + '/' + this.extensiveChords));
                this.scaleChords = scaleChords.data.chords;
            } catch (error) {
                return console.error('Error getting scale:', error);
            }
        },
        compareNotes(chord_name, note_name){
            if (chord_name.substr(0, 2) == note_name) return true;
            if (chord_name[1] == ' '){
                if (chord_name.substr(0, 1) == note_name) return true;
            }
            return false;
        }
    }
}
</script>

<template>
    <v-container>
        <v-row> 
            <v-col cols="2">
                <v-select label="Root Note" v-model="selectedNote" @update:model-value="getScale" :items="notes" density="comfortable" />
            </v-col>
            <v-col cols="3">
                <v-select label="Scale" v-model="selectedScale" @update:model-value="getScale" :items="scaleNames"
                    density="comfortable" />
            </v-col>
            <v-col>
                <v-switch label="Show Extensive Chords" @update:model-value="getScale" v-model="extensiveChords" false-value="" true-value="true" color="primary" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div>Notes in the {{ selectedNote }} {{ selectedScale }} scale</div>
                <v-divider :thickness="2" style="padding: .25em" />
                <div><b v-for="note in currentScale">&nbsp;{{ note }}&nbsp;</b></div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div>Diatonic Chords</div>
                <v-divider :thickness="2" style="padding: .25em" />
                <v-container>
                    <v-row>
                        <v-col cols="3" v-for="note in currentScale">
                            <div>{{ note }}</div>
                            <template v-for="chord in scaleChords">
                                <div v-if="compareNotes(chord.chord_name, note)">
                                    <b>{{ chord.chord_name }}:&nbsp;</b>
                                    <span v-for="note in chord.chord_notes">&nbsp;{{ note }}&nbsp;</span>
                                </div>
                            </template>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>
