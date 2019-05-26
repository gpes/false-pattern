
package br.edu.ifpb.gpes.fp.detection.readers;

import br.edu.ifpb.gpes.shared.FalsePatternDetection;
import br.edu.ifpb.gpes.shared.TermSet;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author natan
 */
public class FileTermSets {
    private File filePath;

    public FileTermSets() {
        this(new File("../terms/catalogTerms.json"));
    }

    public FileTermSets(File filePath) {
        this.filePath = filePath;
    }
    
    public List<TermSet> readOutput() {
        List<TermSet> termSet = new ArrayList<>();
        String content = "";
        try {
            content = new String(Files.readAllBytes(Paths.get(this.filePath.getPath())));
            
            ObjectMapper objectMapper = new ObjectMapper();
            CollectionType constructCollectionType = objectMapper.getTypeFactory().constructCollectionType(ArrayList.class, TermSet.class);
            termSet = objectMapper.readValue(content, constructCollectionType);
            
        } catch (IOException ex) {
            Logger.getLogger(FileBenchmarking.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return termSet;
    }
    
    public List<String> pickATermList(String patternName, List<TermSet> termSets) {
        TermSet set = new TermSet();
        
        set = termSets.stream()
                .filter(termSet -> termSet.getPatternName().equals(patternName))
                .findAny()
                .orElse(new TermSet());
        
        return set.getTerms();
    }
}
